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
import com.pnikosis.materialishprogress.ProgressWheel;

import java.util.ArrayList;
import java.util.List;

import raijin.studentmanager.Constants;
import raijin.studentmanager.R;
import raijin.studentmanager.adapters.CourseManageRvAdapter;
import raijin.studentmanager.interfaces.Searchable;
import raijin.studentmanager.models.course.Course;
import raijin.studentmanager.models.course.CourseModel;
import raijin.studentmanager.models.department.Department;
import raijin.studentmanager.models.department.DepartmentModel;
import raijin.studentmanager.webservices.CourseAPI;
import raijin.studentmanager.webservices.DepartmentAPI;
import raijin.studentmanager.webservices.ServiceFactory;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 */
public class CourseManageFragment extends Fragment implements Searchable {

    private RecyclerView recyclerView;
    private CourseManageRvAdapter adapter;
    private List<Course> courseList;
    private List<Course> courseListFull;
    private List<Department> departmentList;
    private int offset = 0;
    private ArrayAdapter spinnerAdapter;

    private CoordinatorLayout coordinatorLayout;
    private FloatingActionButton fab;
    private ProgressWheel progressWheel;

    public CourseManageFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             final Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_manage, container, false);
        coordinatorLayout = (CoordinatorLayout) view.findViewById(R.id.coordinator_layout);
        fab = (FloatingActionButton) view.findViewById(R.id.fab);
        progressWheel = (ProgressWheel) view.findViewById(R.id.progress_wheel);
        progressWheel.spin();
        getActivity().setTitle(R.string.course_management);
        recyclerView = (RecyclerView) view.findViewById(R.id.recycler_view);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(getContext(), DividerItemDecoration.VERTICAL);
        recyclerView.addItemDecoration(itemDecoration);
        courseList = new ArrayList<>();
        courseListFull = new ArrayList<>();
        initDepartmentList();
        adapter = new CourseManageRvAdapter(courseList, courseListFull, departmentList, this);
        recyclerView.setAdapter(adapter);
        fab.setOnClickListener(new View.OnClickListener() {
            final List<String> requirementList = new ArrayList<>();

            @Override
            public void onClick(View v) {
                MaterialDialog dialog = new MaterialDialog.Builder(getActivity())
                        .title(R.string.add_course)
                        .customView(R.layout.dialog_course_edit, true)
                        .positiveText(R.string.submit)
                        .negativeText(R.string.cancel)
                        .onPositive(new MaterialDialog.SingleButtonCallback() {
                            @Override
                            public void onClick(@NonNull MaterialDialog dialog, @NonNull DialogAction which) {
                                EditText courseIdEditText = (EditText) dialog.findViewById(R.id.et_course_id);
                                EditText courseNameEditText = (EditText) dialog.findViewById(R.id.et_course_name);
                                EditText coursePriceEditText = (EditText) dialog.findViewById(R.id.et_course_price);
                                RadioGroup courseRadioGroup = (RadioGroup) dialog.findViewById(R.id.rg_course_status);
                                boolean active = courseRadioGroup.getCheckedRadioButtonId() == R.id.radio_active;
                                Spinner spinner = (Spinner) dialog.findViewById(R.id.spinner);
                                int price = 0;
                                if (coursePriceEditText.getText().toString().equals(""))
                                    price = 0;
                                else
                                    price = Integer.parseInt(coursePriceEditText.getText().toString());
                                Department department = (Department) spinner.getSelectedItem();
                                Course course1 = new Course(courseIdEditText.getText().toString(),
                                        courseNameEditText.getText().toString(), price
                                        , active, department.getId(), requirementList);
                                ServiceFactory.getInst().createService(CourseAPI.class).createCourse(course1)
                                        .enqueue(new Callback<Course>() {
                                            @Override
                                            public void onResponse(Call<Course> call, Response<Course> response) {
                                                if (response.isSuccessful()) {
                                                    showSnackbar(R.string.course_added);
                                                    Course course2 = response.body();
                                                    courseList.add(course2);
                                                    courseListFull.add(course2);
                                                    adapter.notifyDataSetChanged();
                                                } else
                                                    showSnackbar(R.string.course_fail_add);
                                            }

                                            @Override
                                            public void onFailure(Call<Course> call, Throwable t) {
                                                showSnackbar(R.string.course_fail_add);
                                            }
                                        });
                            }
                        })
                        .build();
                Spinner spinner = (Spinner) dialog.findViewById(R.id.spinner);
                spinner.setAdapter(spinnerAdapter);
                dialog.show();
                final EditText requirementEditText = (EditText) dialog.findViewById(R.id.et_requirement);
                final TextView requirementTextView = (TextView) dialog.findViewById(R.id.tv_requirement);
                Button addButton = (Button) dialog.findViewById(R.id.btn_add);
                addButton.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        if (!requirementEditText.getText().toString().equals("")) {
                            requirementList.add(requirementEditText.getText().toString());
                            String requirement1 = "";
                            for (String requirement : requirementList) {
                                requirement1 += requirement + "\n";
                            }
                            requirementTextView.setText(requirement1);
                        }
                    }
                });
            }
        });
        loadData();
        return view;
    }

    private void initDepartmentList() {
        departmentList = new ArrayList<>();
        spinnerAdapter = new ArrayAdapter<>(getActivity(),
                android.R.layout.simple_spinner_item, departmentList);
        spinnerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        ServiceFactory.getInst().createService(DepartmentAPI.class).callDepartment(Constants.JSON_FORMAT, Constants.MAX_ITEM, 0)
                .enqueue(new Callback<DepartmentModel>() {
                    @Override
                    public void onResponse(Call<DepartmentModel> call, Response<DepartmentModel> response) {
                        if (response.isSuccessful()) {
                            for (Department department : response.body().getDepartments()) {
                                departmentList.add(department);
                            }
                            spinnerAdapter.notifyDataSetChanged();
                        }
                    }

                    @Override
                    public void onFailure(Call<DepartmentModel> call, Throwable t) {

                    }
                });
    }

    private void loadData() {
        CourseAPI courseAPI = ServiceFactory.getInst().createService(CourseAPI.class);
        courseAPI.callCourse(Constants.JSON_FORMAT, Constants.MAX_ITEM, offset)
                .enqueue(new Callback<CourseModel>() {
                    @Override
                    public void onResponse(Call<CourseModel> call, Response<CourseModel> response) {
                        if (response.isSuccessful()) {
                            for (Course course : response.body().getCourses()) {
                                courseList.add(course);
                                courseListFull.add(course);
                            }
                            adapter.notifyDataSetChanged();
                            progressWheel.stopSpinning();
                        }
                    }

                    @Override
                    public void onFailure(Call<CourseModel> call, Throwable t) {

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
