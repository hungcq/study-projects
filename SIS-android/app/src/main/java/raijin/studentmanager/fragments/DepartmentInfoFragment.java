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
import raijin.studentmanager.activities.StudentActivity;
import raijin.studentmanager.adapters.DepartmentInfoRvAdapter;
import raijin.studentmanager.interfaces.Searchable;
import raijin.studentmanager.models.department.Department;
import raijin.studentmanager.models.department.DepartmentModel;
import raijin.studentmanager.webservices.DepartmentAPI;
import raijin.studentmanager.webservices.ServiceFactory;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 */
public class DepartmentInfoFragment extends Fragment implements Searchable {


    private RecyclerView recyclerView;
    private ProgressWheel progressWheel;
    private DepartmentInfoRvAdapter adapter;
    private List<Department> departmentList;
    private List<Department> departmentListFull;

    public DepartmentInfoFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_info, container, false);
        getActivity().setTitle(R.string.department_info);
        recyclerView = (RecyclerView) view.findViewById(R.id.recycler_view);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(getContext(), DividerItemDecoration.VERTICAL);
        recyclerView.addItemDecoration(itemDecoration);
        departmentList = new ArrayList<>();
        departmentListFull = new ArrayList<>();
        adapter = new DepartmentInfoRvAdapter(departmentList, departmentListFull);
        recyclerView.setAdapter(adapter);
        progressWheel = (ProgressWheel) view.findViewById(R.id.progress_wheel);
        progressWheel.spin();
        loadData();
        return view;
    }

    private void loadData() {
        DepartmentAPI departmentAPI = ServiceFactory.getInst().createService(DepartmentAPI.class);
        departmentAPI.callDepartment(Constants.JSON_FORMAT, Constants.MAX_ITEM, 0)
                .enqueue(new Callback<DepartmentModel>() {
            @Override
            public void onResponse(Call<DepartmentModel> call, Response<DepartmentModel> response) {
                if (response.isSuccessful()) {
                    for(Department department : response.body().getDepartments()) {
                        departmentList.add(department);
                        departmentListFull.add(department);
                    }
                    adapter.notifyDataSetChanged();
                    progressWheel.stopSpinning();
                }
            }

            @Override
            public void onFailure(Call<DepartmentModel> call, Throwable t) {

            }
        });
    }

    @Override
    public void doSearch(String text) {
        adapter.filter(text);
    }
}
