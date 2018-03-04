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
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.RadioGroup;
import android.widget.Spinner;

import com.afollestad.materialdialogs.DialogAction;
import com.afollestad.materialdialogs.MaterialDialog;
import com.pnikosis.materialishprogress.ProgressWheel;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import raijin.studentmanager.Constants;
import raijin.studentmanager.R;
import raijin.studentmanager.adapters.SessionManageRvAdapter;
import raijin.studentmanager.interfaces.Searchable;
import raijin.studentmanager.models.course.Course;
import raijin.studentmanager.models.course.CourseModel;
import raijin.studentmanager.models.lecturer.Lecturer;
import raijin.studentmanager.models.lecturer.LecturerModel;
import raijin.studentmanager.models.room.Room;
import raijin.studentmanager.models.session.Session;
import raijin.studentmanager.models.session.SessionModel;
import raijin.studentmanager.webservices.CourseAPI;
import raijin.studentmanager.webservices.LecturerAPI;
import raijin.studentmanager.webservices.RoomAPI;
import raijin.studentmanager.webservices.SessionAPI;
import raijin.studentmanager.webservices.ServiceFactory;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 */
public class SessionManageFragment extends Fragment implements Searchable {

    private RecyclerView recyclerView;
    private ProgressWheel progressWheel;
    private SessionManageRvAdapter adapter;
    private List<Session> sessionList;
    private List<Session> sessionListFull;
    private List<Course> courseList;
    private List<Lecturer> lecturerList;
    private List<String> buildingList;
    private List<Room> roomList;

    private ArrayAdapter courseSpinnerAdapter;
    private ArrayAdapter lecturerSpinnerAdapter;
    private ArrayAdapter roomSpinnerAdapter;
    private ArrayAdapter buildingSpinnerAdapter;

    private CoordinatorLayout coordinatorLayout;
    private FloatingActionButton fab;

    public SessionManageFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_manage, container, false);
        getActivity().setTitle(R.string.session_management);
        coordinatorLayout = (CoordinatorLayout) view.findViewById(R.id.coordinator_layout);
        fab = (FloatingActionButton) view.findViewById(R.id.fab);
        progressWheel = (ProgressWheel) view.findViewById(R.id.progress_wheel);
        progressWheel.spin();
        recyclerView = (RecyclerView) view.findViewById(R.id.recycler_view);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(getContext(), DividerItemDecoration.VERTICAL);
        recyclerView.addItemDecoration(itemDecoration);
        sessionList = new ArrayList<>();
        sessionListFull = new ArrayList<>();
        initCourseList();
        lecturerList = new ArrayList<>();
        lecturerSpinnerAdapter = new ArrayAdapter<>(getActivity(), android.R.layout.simple_spinner_item, lecturerList);
        lecturerSpinnerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        buildingList = new ArrayList<>();
        getBuildingList();
        buildingSpinnerAdapter = new ArrayAdapter<>(getActivity(), android.R.layout.simple_spinner_item, buildingList);
        buildingSpinnerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        roomList = new ArrayList<>();
        roomSpinnerAdapter = new ArrayAdapter<>(getActivity(), android.R.layout.simple_spinner_item, roomList);
        roomSpinnerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

        adapter = new SessionManageRvAdapter(this, sessionList, sessionListFull, courseList, buildingList);
        recyclerView.setAdapter(adapter);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                MaterialDialog dialog = new MaterialDialog.Builder(getActivity())
                        .title(R.string.add_session)
                        .customView(R.layout.dialog_session_edit, true)
                        .positiveText(R.string.submit)
                        .negativeText(R.string.cancel)
                        .onPositive(new MaterialDialog.SingleButtonCallback() {
                            @Override
                            public void onClick(@NonNull MaterialDialog dialog, @NonNull DialogAction which) {
                                RadioGroup semesterRadioGroup = (RadioGroup) dialog.findViewById(R.id.rg_semester);
                                int semester = 1;
                                switch (semesterRadioGroup.getCheckedRadioButtonId()) {
                                    case R.id.radio_semester_1:
                                        semester = 1;
                                        break;
                                    case R.id.radio_semester_2:
                                        semester = 2;
                                        break;
                                    case R.id.radio_semester_3:
                                        semester = 3;
                                        break;
                                }
                                Spinner yearSpinner = (Spinner) dialog.findViewById(R.id.spinner_year);
                                EditText maxEnrollEditText = (EditText) dialog.findViewById(R.id.et_max_enroll);
                                Spinner startSpinner = (Spinner) dialog.findViewById(R.id.spinner_start);
                                Spinner endSpinner = (Spinner) dialog.findViewById(R.id.spinner_end);
                                int weekday = 2;
                                RadioGroup dayRadioGroup = (RadioGroup) dialog.findViewById(R.id.rg_day);
                                switch (dayRadioGroup.getCheckedRadioButtonId()) {
                                    case R.id.radio_2:
                                        weekday = 2;
                                        break;
                                    case R.id.radio_3:
                                        weekday = 3;
                                        break;
                                    case R.id.radio_4:
                                        weekday = 4;
                                        break;
                                    case R.id.radio_5:
                                        weekday = 5;
                                        break;
                                    case R.id.radio_6:
                                        weekday = 6;
                                        break;
                                    case R.id.radio_7:
                                        weekday = 7;
                                        break;
                                }
                                final Spinner roomSpinner = (Spinner) dialog.findViewById(R.id.spinner_room);
                                Room room = (Room) roomSpinner.getSelectedItem();
                                Spinner courseSpinner = (Spinner) dialog.findViewById(R.id.spinner_course);
                                final Spinner lecturerSpinner = (Spinner) dialog.findViewById(R.id.spinner_lecturer);
                                int lecturerID = 0;
                                for (Lecturer lecturer : lecturerList) {
                                    if (lecturerSpinner.getSelectedItem().toString().equals(lecturer.getFirstName() + " " + lecturer.getLastName())) {
                                        lecturerID = lecturer.getId();
                                    }
                                }
                                String courseID = null;
                                for (Course course : courseList) {
                                    if (courseSpinner.getSelectedItem().toString().equals(course.getId())) {
                                        courseID = course.getId();
                                    }
                                }
                                Session session1 = new Session(semester, Integer.parseInt(yearSpinner.getSelectedItem().toString()),
                                        Integer.parseInt(maxEnrollEditText.getText().toString()),
                                        Integer.parseInt(startSpinner.getSelectedItem().toString()),
                                        Integer.parseInt(endSpinner.getSelectedItem().toString()),
                                        weekday, room.getId(), courseID, lecturerID);
                                ServiceFactory.getInst().createService(SessionAPI.class).createSession(session1)
                                        .enqueue(new Callback<Session>() {
                                            @Override
                                            public void onResponse(Call<Session> call, Response<Session> response) {
                                                if (response.isSuccessful()) {
                                                    showSnackbar(R.string.session_added);
                                                    Session session2 = response.body();
                                                    session2.setLecturerName(lecturerSpinner.getSelectedItem().toString());
                                                    session2.setRoom(roomSpinner.getSelectedItem().toString());
                                                    sessionList.add(session2);
                                                    sessionListFull.add(session2);
                                                    adapter.notifyDataSetChanged();
                                                } else {
                                                    showSnackbar(R.string.session_fail_add);
                                                }
                                            }

                                            @Override
                                            public void onFailure(Call<Session> call, Throwable t) {
                                                showSnackbar(R.string.session_fail_add);
                                            }
                                        });
                            }
                        })
                        .build();
                Spinner yearSpinner = (Spinner) dialog.findViewById(R.id.spinner_year);
                List<String> yearList = new ArrayList<>();
                int currentYear = Calendar.getInstance().get(Calendar.YEAR);
                yearList.add(currentYear + "");
                ArrayAdapter<String> yearAdapter = new ArrayAdapter<>(getActivity(), android.R.layout.simple_spinner_item, yearList);
                yearAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                yearSpinner.setAdapter(yearAdapter);
                Spinner buildingSpinner = (Spinner) dialog.findViewById(R.id.spinner_building);
                buildingSpinner.setAdapter(buildingSpinnerAdapter);
                buildingSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                    @Override
                    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                        getRoomByBuilding(buildingList.get(position));
                    }

                    @Override
                    public void onNothingSelected(AdapterView<?> parent) {

                    }
                });
                Spinner roomSpinner = (Spinner) dialog.findViewById(R.id.spinner_room);
                roomSpinner.setAdapter(roomSpinnerAdapter);
                Spinner startSpinner = (Spinner) dialog.findViewById(R.id.spinner_start);
                List<String> startList = new ArrayList<>();
                for (int i = 1; i <= 20; i++) {
                    startList.add(i + "");
                }
                ArrayAdapter<String> startAdapter = new ArrayAdapter<>(getActivity(), android.R.layout.simple_spinner_item, startList);
                startAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                startSpinner.setAdapter(startAdapter);
                Spinner endSpinner = (Spinner) dialog.findViewById(R.id.spinner_end);
                List<String> endList = new ArrayList<>();
                for (int i = 1; i <= 20; i++) {
                    endList.add(i + "");
                }
                ArrayAdapter<String> endAdapter = new ArrayAdapter<>(getActivity(), android.R.layout.simple_spinner_item, endList);
                endAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                endSpinner.setAdapter(endAdapter);
                Spinner courseSpinner = (Spinner) dialog.findViewById(R.id.spinner_course);
                courseSpinner.setAdapter(courseSpinnerAdapter);
                courseSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                    @Override
                    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                        getLecturerListByCourse(courseList.get(position).getId());
                    }

                    @Override
                    public void onNothingSelected(AdapterView<?> parent) {

                    }
                });
                Spinner lecturerSpinner = (Spinner) dialog.findViewById(R.id.spinner_lecturer);
                lecturerSpinner.setAdapter(lecturerSpinnerAdapter);
                dialog.show();
            }
        });
        loadData();
        return view;
    }

    private void initCourseList() {
        courseList = new ArrayList<>();
        courseSpinnerAdapter = new ArrayAdapter<>(getActivity(), android.R.layout.simple_spinner_item, courseList);
        courseSpinnerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        ServiceFactory.getInst().createService(CourseAPI.class).callCourse(Constants.JSON_FORMAT, Constants.MAX_ITEM, 0)
                .enqueue(new Callback<CourseModel>() {
                    @Override
                    public void onResponse(Call<CourseModel> call, Response<CourseModel> response) {
                        if (response.isSuccessful()) {
                            for (Course course : response.body().getCourses()) {
                                courseList.add(course);
                            }
                            courseSpinnerAdapter.notifyDataSetChanged();
                        }
                    }

                    @Override
                    public void onFailure(Call<CourseModel> call, Throwable t) {

                    }
                });
    }

    private void getLecturerListByCourse(String courseID) {
        ServiceFactory.getInst().createService(LecturerAPI.class).callLecturerByCourse(Constants.JSON_FORMAT, Constants.MAX_ITEM, 0, courseID)
                .enqueue(new Callback<LecturerModel>() {
                    @Override
                    public void onResponse(Call<LecturerModel> call, Response<LecturerModel> response) {
                        if (response.isSuccessful()) {
                            lecturerList.clear();
                            for (Lecturer lecturer : response.body().getLecturerList()) {
                                lecturerList.add(lecturer);
                            }
                            lecturerSpinnerAdapter.notifyDataSetChanged();
                        }
                    }

                    @Override
                    public void onFailure(Call<LecturerModel> call, Throwable t) {

                    }
                });
    }

    private void getRoomByBuilding(String building) {
        ServiceFactory.getInst().createService(RoomAPI.class).callRoomByBuilding(building, Constants.JSON_FORMAT)
                .enqueue(new Callback<List<Room>>() {
                    @Override
                    public void onResponse(Call<List<Room>> call, Response<List<Room>> response) {
                        if (response.isSuccessful()) {
                            roomList.clear();
                            for (Room room : response.body()) {
                                roomList.add(room);
                            }
                            roomSpinnerAdapter.notifyDataSetChanged();
                        }
                    }

                    @Override
                    public void onFailure(Call<List<Room>> call, Throwable t) {

                    }
                });
    }

    private void getBuildingList() {
        ServiceFactory.getInst().createService(RoomAPI.class).callBuilding(Constants.JSON_FORMAT)
                .enqueue(new Callback<List<String>>() {
                    @Override
                    public void onResponse(Call<List<String>> call, Response<List<String>> response) {
                        if (response.isSuccessful()) {
                            for (String building : response.body()) {
                                buildingList.add(building);
                            }
                            buildingSpinnerAdapter.notifyDataSetChanged();
                        }
                    }

                    @Override
                    public void onFailure(Call<List<String>> call, Throwable t) {

                    }
                });
    }

    private void loadData() {
        SessionAPI sessionAPI = ServiceFactory.getInst().createService(SessionAPI.class);
        sessionAPI.callSession(Constants.JSON_FORMAT, Constants.MAX_ITEM, 0)
                .enqueue(new Callback<SessionModel>() {
                    @Override
                    public void onResponse(Call<SessionModel> call, Response<SessionModel> response) {
                        if (response.isSuccessful()) {
                            for (Session session : response.body().getSessions()) {
                                sessionList.add(session);
                                sessionListFull.add(session);
                            }
                            adapter.notifyDataSetChanged();
                            progressWheel.stopSpinning();
                        }
                    }

                    @Override
                    public void onFailure(Call<SessionModel> call, Throwable t) {

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

//    private void genSession() {
//        for (int i = 5; i <= 129; i++) {
//            int start = (int) (Math.random() * 11);
//            int weekday = (int) (Math.random() * 6) + 2;
//            ServiceFactory.getInst().createService(SessionAPI.class).createSession(new Session((int) (Math.random() * 3), 2017,
//                    ((int) (Math.random() * 10)) * 10, start, start + (int) (Math.random() * 2), weekday,
//                    "D" + (int) (Math.random() * 10) + "." + ((int) (Math.random() * 100) + 100), courseIdList.get((int) (Math.random() * courseIdList.size())), i))
//                    .enqueue(new Callback<Session>() {
//                        @Override
//                        public void onResponse(Call<Session> call, Response<Session> response) {
//                            if (response.isSuccessful()) {
//                                showSnackbar(R.string.session_added);
//                            }
//                        }
//
//                        @Override
//                        public void onFailure(Call<Session> call, Throwable t) {
//
//                        }
//                    });
//
//        }
//    }
}
