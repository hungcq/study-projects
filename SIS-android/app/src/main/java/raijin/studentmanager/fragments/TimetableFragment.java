package raijin.studentmanager.fragments;


import android.os.Bundle;
import android.support.design.widget.CoordinatorLayout;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.support.v7.widget.DividerItemDecoration;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.pnikosis.materialishprogress.ProgressWheel;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import raijin.studentmanager.Constants;
import raijin.studentmanager.R;
import raijin.studentmanager.adapters.CourseInfoRvAdapter;
import raijin.studentmanager.adapters.TimetableRvAdapter;
import raijin.studentmanager.interfaces.Searchable;
import raijin.studentmanager.models.session.Session;
import raijin.studentmanager.models.userinfo.UserInfo;
import raijin.studentmanager.webservices.ServiceFactory;
import raijin.studentmanager.webservices.UserAPI;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 */
public class TimetableFragment extends Fragment implements Searchable {

    private RecyclerView recyclerView;
    private ProgressWheel progressWheel;
    private TimetableRvAdapter adapter;
    private List<Session> sessionList;
    private List<Session> sessionListFull;

    public TimetableFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_info, container, false);
        getActivity().setTitle(R.string.timetable);
        recyclerView = (RecyclerView) view.findViewById(R.id.recycler_view);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(getContext(), DividerItemDecoration.VERTICAL);
        recyclerView.addItemDecoration(itemDecoration);
        sessionList = new ArrayList<>();
        sessionListFull = new ArrayList<>();
        adapter = new TimetableRvAdapter(sessionList, sessionListFull);
        recyclerView.setAdapter(adapter);
        progressWheel = (ProgressWheel) view.findViewById(R.id.progress_wheel);
        progressWheel.spin();
        loadData();
        return view;
    }

    private void loadData() {
        ServiceFactory.getInst().createService(UserAPI.class).callUserInfo(Constants.JSON_FORMAT)
                .enqueue(new Callback<UserInfo>() {
                    @Override
                    public void onResponse(Call<UserInfo> call, Response<UserInfo> response) {
                        if (response.isSuccessful()) {
                            for (Session session : response.body().getSessions()) {
                                sessionList.add(session);
                                sessionListFull.add(session);
                            }
                            Collections.sort(sessionList, new Comparator<Session>() {
                                @Override
                                public int compare(Session o1, Session o2) {
                                    return o1.getWeekDay() - o2.getWeekDay();
                                }
                            });
                            adapter.notifyDataSetChanged();
                            progressWheel.stopSpinning();
                        }
                    }

                    @Override
                    public void onFailure(Call<UserInfo> call, Throwable t) {

                    }
                });
    }

    @Override
    public void doSearch(String text) {
        adapter.filter(text);
    }
}
