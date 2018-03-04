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
import android.widget.Button;

import com.google.gson.Gson;
import com.pnikosis.materialishprogress.ProgressWheel;

import java.util.ArrayList;
import java.util.List;

import raijin.studentmanager.Constants;
import raijin.studentmanager.R;
import raijin.studentmanager.adapters.StudentSimpleRvAdapter;
import raijin.studentmanager.interfaces.Searchable;
import raijin.studentmanager.models.ResultCheck;
import raijin.studentmanager.models.score.Score;
import raijin.studentmanager.models.student.Student;
import raijin.studentmanager.models.student.StudentInSession;
import raijin.studentmanager.models.student.StudentModel;
import raijin.studentmanager.webservices.ScoreAPI;
import raijin.studentmanager.webservices.ServiceFactory;
import raijin.studentmanager.webservices.SessionAPI;
import raijin.studentmanager.webservices.StudentAPI;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 */
public class ScoreManageStudentFragment extends Fragment implements Searchable {

    private RecyclerView recyclerView;
    private ProgressWheel progressWheel;
    private StudentSimpleRvAdapter adapter;
    private List<StudentInSession> studentList;
    private List<StudentInSession> studentListFull;
    private CoordinatorLayout coordinatorLayout;
    private Button saveButton;

    public ScoreManageStudentFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_score_manage_student, container, false);
        getActivity().setTitle(R.string.edit_score);
        progressWheel = (ProgressWheel) view.findViewById(R.id.progress_wheel);
        progressWheel.spin();
        recyclerView = (RecyclerView) view.findViewById(R.id.recycler_view);
        coordinatorLayout = (CoordinatorLayout) view.findViewById(R.id.coordinator_layout);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(getContext(), DividerItemDecoration.VERTICAL);
        recyclerView.addItemDecoration(itemDecoration);
        studentList = new ArrayList<>();
        studentListFull = new ArrayList<>();
        adapter = new StudentSimpleRvAdapter(studentList, studentListFull, this);
        recyclerView.setAdapter(adapter);
        saveButton = (Button) view.findViewById(R.id.btn_save);
        saveButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                List<Score> scoreList = new ArrayList<>();
                for (StudentInSession student : studentList) {
                    scoreList.add(new Score(student.getScore(), student.getStudentId(), student.getSessionId()));
                }
                ServiceFactory.getInst().createService(ScoreAPI.class)
                        .updateScore(scoreList)
                        .enqueue(new Callback<ResultCheck>() {
                            @Override
                            public void onResponse(Call<ResultCheck> call, Response<ResultCheck> response) {
                                if (response.isSuccessful()) {
                                    showSnackbar(R.string.score_updated);
                                } else showSnackbar(R.string.score_fail_update);
                            }

                            @Override
                            public void onFailure(Call<ResultCheck> call, Throwable t) {
                                showSnackbar(R.string.score_fail_update);
                            }
                        });
            }
        });
        loadData();
        return view;
    }

    private void loadData() {
        ServiceFactory.getInst().createService(SessionAPI.class)
                .callStudentListOfSession(getArguments().getInt("session_id"), Constants.JSON_FORMAT)
                .enqueue(new Callback<List<StudentInSession>>() {
                    @Override
                    public void onResponse(Call<List<StudentInSession>> call, Response<List<StudentInSession>> response) {
                        if (response.isSuccessful()) {
                            studentList.clear();
                            for (StudentInSession student : response.body()) {
                                studentList.add(student);
                                studentListFull.add(student);
                            }
                            adapter.notifyDataSetChanged();
                            progressWheel.stopSpinning();
                        }
                    }

                    @Override
                    public void onFailure(Call<List<StudentInSession>> call, Throwable t) {

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
