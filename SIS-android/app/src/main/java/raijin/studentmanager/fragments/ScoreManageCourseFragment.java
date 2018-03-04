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
import raijin.studentmanager.adapters.CourseSimpleRvAdapter;
import raijin.studentmanager.interfaces.Searchable;
import raijin.studentmanager.models.course.Course;
import raijin.studentmanager.models.course.CourseModel;
import raijin.studentmanager.webservices.CourseAPI;
import raijin.studentmanager.webservices.ServiceFactory;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 */
public class ScoreManageCourseFragment extends Fragment implements Searchable {

    private RecyclerView recyclerView;
    private ProgressWheel progressWheel;
    private CourseSimpleRvAdapter adapter;
    private List<Course> courseList;
    private List<Course> courseListFull;

    public ScoreManageCourseFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_info, container, false);
        getActivity().setTitle(R.string.choose_course);
        progressWheel = (ProgressWheel) view.findViewById(R.id.progress_wheel);
        progressWheel.spin();
        recyclerView = (RecyclerView) view.findViewById(R.id.recycler_view);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(getContext(), DividerItemDecoration.VERTICAL);
        recyclerView.addItemDecoration(itemDecoration);
        courseList = new ArrayList<>();
        courseListFull = new ArrayList<>();
        adapter = new CourseSimpleRvAdapter(courseList, courseListFull);
        recyclerView.setAdapter(adapter);
        loadData();
        return view;
    }

    private void loadData() {
        ServiceFactory.getInst().createService(CourseAPI.class).callCourse(Constants.JSON_FORMAT, Constants.MAX_ITEM, 0)
                .enqueue(new Callback<CourseModel>() {
                    @Override
                    public void onResponse(Call<CourseModel> call, Response<CourseModel> response) {
                        if (response.isSuccessful()) {
                            for (Course course : response.body().getCourses()) {
                                courseList.add(course);
                                courseListFull.add(course);
                            }
                            progressWheel.stopSpinning();
                            adapter.notifyDataSetChanged();
                        }
                    }

                    @Override
                    public void onFailure(Call<CourseModel> call, Throwable t) {

                    }
                });
    }

    @Override
    public void doSearch(String text) {
        adapter.filter(text);
    }
}
