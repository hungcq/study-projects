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
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;

import com.afollestad.materialdialogs.DialogAction;
import com.afollestad.materialdialogs.MaterialDialog;
import com.pnikosis.materialishprogress.ProgressWheel;

import java.util.ArrayList;
import java.util.List;

import raijin.studentmanager.Constants;
import raijin.studentmanager.R;
import raijin.studentmanager.adapters.StudentManageRvAdapter;
import raijin.studentmanager.interfaces.Searchable;
import raijin.studentmanager.models.classes.ClassModel;
import raijin.studentmanager.models.classes.Classes;
import raijin.studentmanager.models.student.Student;
import raijin.studentmanager.models.student.StudentModel;
import raijin.studentmanager.webservices.ClassAPI;
import raijin.studentmanager.webservices.ServiceFactory;
import raijin.studentmanager.webservices.StudentAPI;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static android.R.attr.fragment;

/**
 * A simple {@link Fragment} subclass.
 */
public class StudentManageFragment extends Fragment implements Searchable {


    private RecyclerView recyclerView;
    private StudentManageRvAdapter adapter;
    private List<Student> studentList;
    private List<String> classesList;
    private int offset = 0;
    private boolean loading = false;
    private int pastVisibleItems, visibleItemCount, totalItemCount;
    private ArrayAdapter<String> spinnerAdapter;
    private double order = 0;

    private CoordinatorLayout coordinatorLayout;
    private FloatingActionButton fab;
    private ProgressWheel progressWheel;

    public StudentManageFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_manage, container, false);
        getActivity().setTitle(R.string.student_management);
        coordinatorLayout = (CoordinatorLayout) view.findViewById(R.id.coordinator_layout);
        fab = (FloatingActionButton) view.findViewById(R.id.fab);
        progressWheel = (ProgressWheel) view.findViewById(R.id.progress_wheel);
        progressWheel.spin();
        recyclerView = (RecyclerView) view.findViewById(R.id.recycler_view);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(getContext(), DividerItemDecoration.VERTICAL);
        recyclerView.addItemDecoration(itemDecoration);
        studentList = new ArrayList<>();
        initClassList();
        adapter = new StudentManageRvAdapter(this, studentList, classesList);
        recyclerView.setAdapter(adapter);
        recyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {
            @Override
            public void onScrolled(RecyclerView recyclerView, int dx, int dy) {
                if (dy > 0) //check for scroll down
                {
                    RecyclerView.LayoutManager layoutManager = recyclerView.getLayoutManager();

                    visibleItemCount = layoutManager.getChildCount();
                    totalItemCount = layoutManager.getItemCount();
                    pastVisibleItems = ((LinearLayoutManager) layoutManager).findFirstVisibleItemPosition();

                    if (!loading) {
                        if ((visibleItemCount + pastVisibleItems) >= totalItemCount) {
                            offset += Constants.ITEM_PER_PAGE;
                            progressWheel.spin();
                            loadData();
                        }
                    }
                }
            }
        });
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                MaterialDialog dialog = new MaterialDialog.Builder(getActivity())
                        .title(R.string.add_student)
                        .customView(R.layout.dialog_student_edit, true)
                        .positiveText(R.string.submit)
                        .negativeText(R.string.cancel)
                        .onPositive(new MaterialDialog.SingleButtonCallback() {
                            @Override
                            public void onClick(@NonNull MaterialDialog dialog, @NonNull DialogAction which) {
                                EditText usernameEditText = (EditText) dialog.findViewById(R.id.et_username);
                                EditText firstNameEditText = (EditText) dialog.findViewById(R.id.et_firstname);
                                EditText lastNameEditText = (EditText) dialog.findViewById(R.id.et_lastname);
                                EditText passwordEditText = (EditText) dialog.findViewById(R.id.et_password);
                                Spinner spinner = (Spinner) dialog.findViewById(R.id.spinner);
                                ServiceFactory.getInst().createService(StudentAPI.class).createStudent(new Student(usernameEditText.getText().toString(),
                                        passwordEditText.getText().toString(), firstNameEditText.getText().toString(),
                                        lastNameEditText.getText().toString(), spinner.getSelectedItem().toString()))
                                        .enqueue(new Callback<Student>() {
                                            @Override
                                            public void onResponse(Call<Student> call, Response<Student> response) {
                                                if (response.isSuccessful()) {
                                                    showSnackbar(R.string.student_added);
                                                    Student student2 = response.body();
                                                    studentList.add(student2);
                                                    adapter.notifyDataSetChanged();
                                                } else
                                                    showSnackbar(R.string.student_fail_add);
                                            }

                                            @Override
                                            public void onFailure(Call<Student> call, Throwable t) {
                                                showSnackbar(R.string.student_fail_add);
                                            }
                                        });
                            }
                        })
                        .build();
                Spinner spinner = (Spinner) dialog.findViewById(R.id.spinner);
                spinner.setAdapter(spinnerAdapter);
                dialog.show();
            }
        });
        loadData();
        return view;
    }

    private void initClassList() {
        classesList = new ArrayList<>();
        spinnerAdapter = new ArrayAdapter<>(getActivity(),
                android.R.layout.simple_spinner_item, classesList);
        spinnerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        ServiceFactory.getInst().createService(ClassAPI.class).callClass(Constants.JSON_FORMAT, Constants.MAX_ITEM, 0)
                .enqueue(new Callback<ClassModel>() {
                    @Override
                    public void onResponse(Call<ClassModel> call, Response<ClassModel> response) {
                        if (response.isSuccessful()) {
                            for (Classes classes : response.body().getResults()) {
                                classesList.add(classes.getId());
                            }
                            spinnerAdapter.notifyDataSetChanged();
                        }
                    }

                    @Override
                    public void onFailure(Call<ClassModel> call, Throwable t) {

                    }
                });
    }

    private void loadData() {
        loading = true;
        StudentAPI studentAPI = ServiceFactory.getInst().createService(StudentAPI.class);
        studentAPI.callStudent(Constants.JSON_FORMAT, Constants.ITEM_PER_PAGE, offset)
                .enqueue(new Callback<StudentModel>() {
                    @Override
                    public void onResponse(Call<StudentModel> call, Response<StudentModel> response) {
                        if (response.isSuccessful()) {
                            for (Student student : response.body().getStudentList()) {
                                studentList.add(student);
                            }
                            adapter.notifyDataSetChanged();
                            progressWheel.stopSpinning();
                            loading = false;
                        }
                    }

                    @Override
                    public void onFailure(Call<StudentModel> call, Throwable t) {

                    }
                });
    }

    public void showSnackbar(int stringID) {
        Snackbar.make(coordinatorLayout, stringID, Snackbar.LENGTH_SHORT).show();
    }

    @Override
    public void doSearch(String text) {
        order++;
        final double searchOrder = order;
        ServiceFactory.getInst().createService(StudentAPI.class)
                .callStudentByUsername(text, Constants.JSON_FORMAT, Constants.MAX_ITEM, 0)
                .enqueue(new Callback<StudentModel>() {
                    @Override
                    public void onResponse(Call<StudentModel> call, Response<StudentModel> response) {
                        if (response.isSuccessful()) {
                            if (searchOrder >= order) {
                                studentList.clear();
                                for (Student student : response.body().getStudentList()) {
                                    studentList.add(student);
                                }
                                adapter.notifyDataSetChanged();
                            }
                        }
                    }

                    @Override
                    public void onFailure(Call<StudentModel> call, Throwable t) {

                    }
                });
    }

//    private void genStudent() {
//        String lastName[] = {"Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Đỗ", "Vũ", "Ngô"};
//        String middleName[] = {"Thị", "Văn", "Quốc"};
//        String firstName[] = {"Anh", "Công", "Cường", "Dũng", "Hưng", "Dương", "Đạt", "Kiên", "Long", "Phong", "Thành", "Tuấn", "Tùng", "Vinh"};
//
//        for (int i = 0; i < 6000; i ++) {
//            String name1 = firstName[(int) (Math.random()*firstName.length)];
//            String name2 = lastName[(int) (Math.random()*lastName.length)] + " "
//                    + middleName[(int) (Math.random()*middleName.length)];
//            ServiceFactory.getInst().createService(StudentAPI.class).createStudent(new Student(20142137 + i + "",
//                    20142137 + i + "", name1,
//                    name2, classesList.get((int) (Math.random() * classesList.size()))))
//                    .enqueue(new Callback<Student>() {
//                        @Override
//                        public void onResponse(Call<Student> call, Response<Student> response) {
//                            if (response.isSuccessful()) {
//                                showSnackbar(R.string.student_added);
//                                Student student2 = response.body();
//                                studentList.add(student2);
//                                adapter.notifyDataSetChanged();
//                            } else
//                                showSnackbar(R.string.student_fail_add);
//                        }
//
//                        @Override
//                        public void onFailure(Call<Student> call, Throwable t) {
//                            showSnackbar(R.string.student_fail_add);
//                        }
//                    });
//        }
//    }
}
