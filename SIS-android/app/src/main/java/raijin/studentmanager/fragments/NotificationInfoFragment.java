package raijin.studentmanager.fragments;


import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.DividerItemDecoration;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.pnikosis.materialishprogress.ProgressWheel;

import java.util.ArrayList;
import java.util.List;

import raijin.studentmanager.Constants;
import raijin.studentmanager.R;
import raijin.studentmanager.adapters.NotificationInfoRvAdapter;
import raijin.studentmanager.interfaces.Searchable;
import raijin.studentmanager.models.notification.Noti;
import raijin.studentmanager.models.session.Session;
import raijin.studentmanager.webservices.NotiAPI;
import raijin.studentmanager.webservices.ServiceFactory;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 */
public class NotificationInfoFragment extends Fragment implements Searchable {

    private RecyclerView recyclerView;
    private ProgressWheel progressWheel;
    private List<Noti> notiList;
    private List<Noti> notiListFull;
    private NotificationInfoRvAdapter adapter;
    private List<Integer> notiIdList;

    public NotificationInfoFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_info, container, false);
        getActivity().setTitle(R.string.notification);
        recyclerView = (RecyclerView) view.findViewById(R.id.recycler_view);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(getContext(), DividerItemDecoration.VERTICAL);
        recyclerView.addItemDecoration(itemDecoration);
        notiList = new ArrayList<>();
        notiListFull = new ArrayList<>();
        adapter = new NotificationInfoRvAdapter(notiList, notiListFull);
        recyclerView.setAdapter(adapter);
        notiIdList = new ArrayList<>();
        progressWheel = (ProgressWheel) view.findViewById(R.id.progress_wheel);
        progressWheel.spin();
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

    @Override
    public void doSearch(String text) {
        adapter.filter(text);
    }
}
