package raijin.studentmanager.fragments;


import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.CoordinatorLayout;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.support.v7.widget.DividerItemDecoration;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioGroup;
import android.widget.Spinner;
import android.widget.TextView;

import com.afollestad.materialdialogs.DialogAction;
import com.afollestad.materialdialogs.MaterialDialog;
import com.amulyakhare.textdrawable.TextDrawable;
import com.amulyakhare.textdrawable.util.ColorGenerator;
import com.pnikosis.materialishprogress.ProgressWheel;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import raijin.studentmanager.Constants;
import raijin.studentmanager.R;
import raijin.studentmanager.adapters.CourseManageRvAdapter;
import raijin.studentmanager.adapters.NotificationInfoRvAdapter;
import raijin.studentmanager.adapters.NotificationManageRvAdapter;
import raijin.studentmanager.interfaces.Searchable;
import raijin.studentmanager.models.course.Course;
import raijin.studentmanager.models.department.Department;
import raijin.studentmanager.models.notification.Noti;
import raijin.studentmanager.models.session.Session;
import raijin.studentmanager.models.userinfo.UserInfo;
import raijin.studentmanager.webservices.CourseAPI;
import raijin.studentmanager.webservices.NotiAPI;
import raijin.studentmanager.webservices.ServiceFactory;
import raijin.studentmanager.webservices.UserAPI;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static android.R.attr.fragment;

/**
 * A simple {@link Fragment} subclass.
 */
public class NotificationManageFragment extends Fragment implements Searchable {

    private RecyclerView recyclerView;
    private ProgressWheel progressWheel;
    private List<Noti> notiList;
    private List<Noti> notiListFull;
    private List<Integer> notiIdList;
    private NotificationManageRvAdapter adapter;
    private CoordinatorLayout coordinatorLayout;
    private List<Session> sessionList;
    private FloatingActionButton fab;
    private ArrayAdapter spinnerAdapter;


    public NotificationManageFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_manage, container, false);
        coordinatorLayout = (CoordinatorLayout) view.findViewById(R.id.coordinator_layout);
        fab = (FloatingActionButton) view.findViewById(R.id.fab);
        getActivity().setTitle(R.string.notification);
        progressWheel = (ProgressWheel) view.findViewById(R.id.progress_wheel);
        progressWheel.spin();
        recyclerView = (RecyclerView) view.findViewById(R.id.recycler_view);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(getContext(), DividerItemDecoration.VERTICAL);
        recyclerView.addItemDecoration(itemDecoration);
        sessionList = new ArrayList<>();
        spinnerAdapter = new ArrayAdapter<>(getActivity(), android.R.layout.simple_spinner_item, sessionList);
        spinnerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        initSessionList();
        notiList = new ArrayList<>();
        notiListFull = new ArrayList<>();
        notiIdList = new ArrayList<>();
        adapter = new NotificationManageRvAdapter(notiList, notiListFull, sessionList, this);
        recyclerView.setAdapter(adapter);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                MaterialDialog dialog = new MaterialDialog.Builder(getActivity())
                        .title(R.string.add_noti)
                        .customView(R.layout.dialog_noti_edit, true)
                        .positiveText(R.string.save)
                        .negativeText(R.string.cancel)
                        .onPositive(new MaterialDialog.SingleButtonCallback() {
                            @Override
                            public void onClick(@NonNull MaterialDialog dialog, @NonNull DialogAction which) {
                                EditText title = (EditText) dialog.findViewById(R.id.et_title);
                                EditText content = (EditText) dialog.findViewById(R.id.et_content);
                                Spinner spinner = (Spinner) dialog.findViewById(R.id.spinner);
                                final Session session = (Session) spinner.getSelectedItem();
                                Noti noti1 = new Noti(title.getText().toString(), content.getText().toString(), session.getId());
                                ServiceFactory.getInst().createService(NotiAPI.class).createNoti(noti1)
                                        .enqueue(new Callback<Noti>() {
                                            @Override
                                            public void onResponse(Call<Noti> call, Response<Noti> response) {
                                                if (response.isSuccessful()) {
                                                    showSnackbar(R.string.noti_added);
                                                    Noti noti2 = response.body();
                                                    noti2.setCourse(session.getCourseName());
                                                    noti2.setLecturer(session.getLecturerName());
                                                    notiList.add(noti2);
                                                    notiListFull.add(noti2);
                                                    adapter.notifyDataSetChanged();
                                                } else showSnackbar(R.string.noti_add_fail);
                                            }

                                            @Override
                                            public void onFailure(Call<Noti> call, Throwable t) {
                                                showSnackbar(R.string.noti_add_fail);
                                            }
                                        });
                            }
                        })
                        .build();
                Spinner spinner = (Spinner) dialog.findViewById(R.id.spinner);
                ArrayAdapter spinnerAdapter = new ArrayAdapter<>(getActivity(), android.R.layout.simple_spinner_item, sessionList);
                spinnerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                spinner.setAdapter(spinnerAdapter);
                dialog.show();
            }
        });
        loadData();
        return view;
    }

    private void loadData() {
        ServiceFactory.getInst().createService(NotiAPI.class).callUserNoti(Constants.JSON_FORMAT)
                .enqueue(new Callback<List<Integer>>() {
                    @Override
                    public void onResponse(Call<List<Integer>> call, Response<List<Integer>> response) {
                        if (response.isSuccessful()) {
                            for (int i = response.body().size() - 1; i >= 0; i--) {
                                notiIdList.add(response.body().get(i));
                            }
                        }
                        ServiceFactory.getInst().createService(NotiAPI.class).callDetailList(Constants.JSON_FORMAT, notiIdList)
                                .enqueue(new Callback<List<Noti>>() {
                                    @Override
                                    public void onResponse(Call<List<Noti>> call, Response<List<Noti>> response) {
                                        if (response.isSuccessful()) {
                                            for (Noti noti : response.body()) {
                                                notiList.add(noti);
                                                notiListFull.add(noti);
                                            }
                                            adapter.notifyDataSetChanged();
                                            progressWheel.stopSpinning();
                                        }
                                    }

                                    @Override
                                    public void onFailure(Call<List<Noti>> call, Throwable t) {

                                    }
                                });
                    }

                    @Override
                    public void onFailure(Call<List<Integer>> call, Throwable t) {

                    }
                });
    }

    private void initSessionList() {
        ServiceFactory.getInst().createService(UserAPI.class).callUserInfo(Constants.JSON_FORMAT)
                .enqueue(new Callback<UserInfo>() {
                    @Override
                    public void onResponse(Call<UserInfo> call, Response<UserInfo> response) {
                        if (response.isSuccessful()) {
                            for (Session session : response.body().getSessions()) {
                                sessionList.add(session);
                            }
                            spinnerAdapter.notifyDataSetChanged();
                        }
                    }

                    @Override
                    public void onFailure(Call<UserInfo> call, Throwable t) {

                    }
                });
    }

    public void showSnackbar(int stringID) {
        Snackbar.make(coordinatorLayout, stringID, Snackbar.LENGTH_SHORT).show();
    }

    @Override
    public void doSearch(String text) {
        adapter.filter(text);
    }
}
