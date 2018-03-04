package raijin.studentmanager.adapters;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RadioGroup;
import android.widget.Spinner;
import android.widget.TextView;

import com.afollestad.materialdialogs.DialogAction;
import com.afollestad.materialdialogs.MaterialDialog;
import com.amulyakhare.textdrawable.TextDrawable;
import com.amulyakhare.textdrawable.util.ColorGenerator;
import com.daimajia.swipe.SwipeLayout;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import raijin.studentmanager.Constants;
import raijin.studentmanager.R;
import raijin.studentmanager.Utils;
import raijin.studentmanager.fragments.SessionManageFragment;
import raijin.studentmanager.interfaces.Filterable;
import raijin.studentmanager.models.course.Course;
import raijin.studentmanager.models.lecturer.Lecturer;
import raijin.studentmanager.models.lecturer.LecturerModel;
import raijin.studentmanager.models.room.Room;
import raijin.studentmanager.models.session.Session;
import raijin.studentmanager.webservices.LecturerAPI;
import raijin.studentmanager.webservices.RoomAPI;
import raijin.studentmanager.webservices.ServiceFactory;
import raijin.studentmanager.webservices.SessionAPI;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Created by 1918 on 02-Jun-17.
 */

public class SessionManageRvAdapter extends RecyclerView.Adapter<SessionManageRvAdapter.MyViewHolder> implements Filterable {

    private Context context;
    private Fragment fragment;
    private List<Session> sessionList;
    private List<Session> sessionListFull;
    private List<Course> courseList;
    private List<Lecturer> lecturerList;
    private List<String> buildingList;
    private List<Room> roomList;
    private ArrayAdapter lecturerSpinnerAdapter;
    private ArrayAdapter buildingAdapter;
    private ArrayAdapter roomSpinnerAdapter;
    private ArrayAdapter courseSpinnerAdapter;
    private Spinner lecturerSpinner;
    private Spinner roomSpinner;

    public SessionManageRvAdapter(Fragment fragment, List<Session> sessionList, List<Session> sessionListFull, List<Course> courseList, List<String> buildingList) {
        this.fragment = fragment;
        this.sessionList = sessionList;
        this.sessionListFull = sessionListFull;
        this.courseList = courseList;
        this.buildingList = buildingList;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        context = parent.getContext();

        buildingAdapter = new ArrayAdapter<>(context, android.R.layout.simple_spinner_item, buildingList);
        buildingAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        lecturerList = new ArrayList<>();
        lecturerSpinnerAdapter = new ArrayAdapter<>(context, android.R.layout.simple_spinner_item, lecturerList);
        lecturerSpinnerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        roomList = new ArrayList<>();
        roomSpinnerAdapter = new ArrayAdapter<>(context, android.R.layout.simple_spinner_item, roomList);
        roomSpinnerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        courseSpinnerAdapter = new ArrayAdapter<>(context, android.R.layout.simple_spinner_item, courseList);
        courseSpinnerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

        View view = LayoutInflater.from(context).inflate(R.layout.row_session_manage, parent, false);
        final MyViewHolder myViewHolder = new MyViewHolder(view);
        myViewHolder.editButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = myViewHolder.getAdapterPosition();
                showEditDialog(sessionList.get(position), position);
            }
        });
        myViewHolder.detailsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = myViewHolder.getAdapterPosition();
                showDetailsDialog(sessionList.get(position));
            }
        });
        myViewHolder.deleteButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = myViewHolder.getAdapterPosition();
                deleteSession(sessionList.get(position), position);
            }
        });
        myViewHolder.contentLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                myViewHolder.swipeLayout.toggle();
            }
        });
        return myViewHolder;
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        Session session = sessionList.get(position);
        holder.swipeLayout.setShowMode(SwipeLayout.ShowMode.PullOut);
        ColorGenerator colorGenerator = ColorGenerator.MATERIAL;
        int color = colorGenerator.getColor(session.getCourseId().charAt(0) + "");
        TextDrawable textDrawable = TextDrawable.builder()
                .buildRound(session.getCourseId().charAt(0) + "", color);
        holder.letterImage.setImageDrawable(textDrawable);
        holder.nameTextView.setText(session.getCourseId());
        String lecturerName = session.getLecturerName() == null ? "No information" : session.getLecturerName();
        holder.detailsTextView.setText(lecturerName + " - " + Utils.weekdayFromInt(session.getWeekDay())
                + ", Period: " + session.getStartAt() + "-" + session.getEndAt());
    }

    private void showDetailsDialog(Session session) {
        ColorGenerator colorGenerator = ColorGenerator.MATERIAL;
        int color = colorGenerator.getColor(session.getCourseId().charAt(0) + "");
        TextDrawable textDrawable = TextDrawable.builder()
                .beginConfig().height(150).width(150).endConfig()
                .buildRound(session.getCourseId().charAt(0) + "", color);
        MaterialDialog dialog = new MaterialDialog.Builder(context)
                .title(session.getCourseId())
                .customView(R.layout.dialog_session_details, true)
                .positiveText(R.string.close)
                .icon(textDrawable)
                .limitIconToDefaultSize()
                .build();
        TextView semester = (TextView) dialog.findViewById(R.id.tv_semester);
        semester.setText(session.getSemester() + "");
        TextView year = (TextView) dialog.findViewById(R.id.tv_year);
        year.setText(session.getYear() + "");
        TextView maxEnroll = (TextView) dialog.findViewById(R.id.tv_max_enroll);
        maxEnroll.setText(session.getMaxEnroll() + "");
        TextView period = (TextView) dialog.findViewById(R.id.tv_period);
        period.setText(session.getStartAt() + "-" + session.getEndAt());
        TextView weekday = (TextView) dialog.findViewById(R.id.tv_weekday);
        weekday.setText(Utils.weekdayFromInt(session.getWeekDay()));
        TextView room = (TextView) dialog.findViewById(R.id.tv_room);
        room.setText(session.getRoom());
        TextView course = (TextView) dialog.findViewById(R.id.tv_course);
        course.setText(session.getCourseId());
        TextView lecturer = (TextView) dialog.findViewById(R.id.tv_lecturer);
        lecturer.setText(session.getLecturerName() == null ? "No information" : session.getLecturerName());
        dialog.show();
    }

    private void showEditDialog(final Session session, final int position) {
        ColorGenerator colorGenerator = ColorGenerator.MATERIAL;
        int color = colorGenerator.getColor(session.getCourseId().charAt(0) + "");
        TextDrawable textDrawable = TextDrawable.builder()
                .beginConfig().height(150).width(150).endConfig()
                .buildRound(session.getCourseId().charAt(0) + "", color);
        MaterialDialog dialog = new MaterialDialog.Builder(context)
                .title(session.getCourseId())
                .customView(R.layout.dialog_session_edit, true)
                .positiveText(R.string.save)
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
                        Course course = (Course) courseSpinner.getSelectedItem();
                        final Spinner lecturerSpinner = (Spinner) dialog.findViewById(R.id.spinner_lecturer);
                        Lecturer lecturer = (Lecturer) lecturerSpinner.getSelectedItem();
                        Session session1 = new Session(semester, Integer.parseInt(yearSpinner.getSelectedItem().toString()),
                                Integer.parseInt(maxEnrollEditText.getText().toString()),
                                Integer.parseInt(startSpinner.getSelectedItem().toString()),
                                Integer.parseInt(endSpinner.getSelectedItem().toString()),
                                weekday, room.getId(), course.getId(), lecturer.getId());
                        ServiceFactory.getInst().createService(SessionAPI.class).updateSession(session.getId(), session1)
                                .enqueue(new Callback<Session>() {
                                    @Override
                                    public void onResponse(Call<Session> call, Response<Session> response) {
                                        if (response.isSuccessful()) {
                                            ((SessionManageFragment) fragment).showSnackbar(R.string.session_updated);
                                            Session session2 = response.body();
                                            session2.setLecturerName(lecturerSpinner.getSelectedItem().toString());
                                            session2.setRoom(roomSpinner.getSelectedItem().toString());
                                            session.setData(session2);
                                            notifyItemChanged(position);
                                        } else {
                                            ((SessionManageFragment) fragment).showSnackbar(R.string.session_fail_update);
                                        }
                                    }

                                    @Override
                                    public void onFailure(Call<Session> call, Throwable t) {
                                        ((SessionManageFragment) fragment).showSnackbar(R.string.session_fail_update);
                                    }
                                });
                    }
                })
                .icon(textDrawable)
                .limitIconToDefaultSize()
                .build();
        RadioGroup semesterRadioGroup = (RadioGroup) dialog.findViewById(R.id.rg_semester);
        switch (session.getSemester()) {
            case 1:
                semesterRadioGroup.check(R.id.radio_semester_1);
                break;
            case 2:
                semesterRadioGroup.check(R.id.radio_semester_2);
                break;
            case 3:
                semesterRadioGroup.check(R.id.radio_semester_3);
                break;
        }
        RadioGroup weekdayRadioGroup = (RadioGroup) dialog.findViewById(R.id.rg_day);
        switch (session.getWeekDay()) {
            case 2:
                weekdayRadioGroup.check(R.id.radio_2);
                break;
            case 3:
                weekdayRadioGroup.check(R.id.radio_3);
                break;
            case 4:
                weekdayRadioGroup.check(R.id.radio_4);
                break;
            case 5:
                weekdayRadioGroup.check(R.id.radio_5);
                break;
            case 6:
                weekdayRadioGroup.check(R.id.radio_6);
                break;
            case 7:
                weekdayRadioGroup.check(R.id.radio_7);
                break;
        }
        EditText maxEnrollEditText = (EditText) dialog.findViewById(R.id.et_max_enroll);
        maxEnrollEditText.setText(session.getMaxEnroll() + "");

        Spinner yearSpinner = (Spinner) dialog.findViewById(R.id.spinner_year);
        List<String> yearList = new ArrayList<>();
        int currentYear = Calendar.getInstance().get(Calendar.YEAR);
        yearList.add(currentYear + "");
        ArrayAdapter<String> yearAdapter = new ArrayAdapter<>(context, android.R.layout.simple_spinner_item, yearList);
        yearAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        yearSpinner.setAdapter(yearAdapter);

        Spinner startSpinner = (Spinner) dialog.findViewById(R.id.spinner_start);
        List<String> startList = new ArrayList<>();
        for (int i = 1; i <= 20; i++) {
            startList.add(i + "");
        }
        ArrayAdapter<String> startAdapter = new ArrayAdapter<>(context, android.R.layout.simple_spinner_item, startList);
        startAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        startSpinner.setAdapter(startAdapter);
        startSpinner.setSelection(startList.indexOf(session.getStartAt() + ""));
        Spinner endSpinner = (Spinner) dialog.findViewById(R.id.spinner_end);
        List<String> endList = new ArrayList<>();
        for (int i = 1; i <= 20; i++) {
            endList.add(i + "");
        }
        ArrayAdapter<String> endAdapter = new ArrayAdapter<>(context, android.R.layout.simple_spinner_item, endList);
        endAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        endSpinner.setAdapter(endAdapter);
        endSpinner.setSelection(endList.indexOf(session.getEndAt() + ""));

        Spinner buildingSpinner = (Spinner) dialog.findViewById(R.id.spinner_building);
        buildingSpinner.setAdapter(buildingAdapter);
        buildingSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                getRoomByBuilding(buildingList.get(position), session);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
        buildingSpinner.setSelection(buildingList.indexOf(session.getRoom().split("-")[0]));

        roomSpinner = (Spinner) dialog.findViewById(R.id.spinner_room);
        roomSpinner.setAdapter(roomSpinnerAdapter);

        Spinner courseSpinner = (Spinner) dialog.findViewById(R.id.spinner_course);
        courseSpinner.setAdapter(courseSpinnerAdapter);
        int courseIndex = 0;
        for (Course course : courseList) {
            if (course.getId().equals(session.getCourseId())) {
                courseIndex = courseList.indexOf(course);
            }
        }
        courseSpinner.setSelection(courseIndex);
        courseSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                getLecturerListByCourse(courseList.get(position).getId(), session);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        lecturerSpinner = (Spinner) dialog.findViewById(R.id.spinner_lecturer);
        lecturerSpinner.setAdapter(lecturerSpinnerAdapter);

        dialog.show();
    }

    private void deleteSession(final Session session, final int position) {
        MaterialDialog dialog = new MaterialDialog.Builder(context)
                .title(R.string.confirm_delete_session)
                .negativeText(R.string.cancel)
                .positiveText(R.string.delete)
                .onPositive(new MaterialDialog.SingleButtonCallback() {
                    @Override
                    public void onClick(@NonNull MaterialDialog dialog, @NonNull DialogAction which) {
                        ServiceFactory.getInst().createService(SessionAPI.class).deleteSession(session.getId())
                                .enqueue(new Callback<Void>() {
                                    @Override
                                    public void onResponse(Call<Void> call, Response<Void> response) {
                                        if (response.isSuccessful()) {
                                            ((SessionManageFragment) fragment).showSnackbar(R.string.deleted);
                                            sessionList.remove(session);
                                            sessionListFull.remove(session);
                                            notifyItemRemoved(position);
                                        }
                                    }

                                    @Override
                                    public void onFailure(Call<Void> call, Throwable t) {

                                    }
                                });
                    }
                })
                .build();
        dialog.show();
    }

    private void getLecturerListByCourse(String courseID, final Session session) {
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
                            int lecturerIndex = 0;
                            for (Lecturer lecturer : lecturerList) {
                                if (lecturer.getId().equals(session.getLecturerId())) {
                                    lecturerIndex = lecturerList.indexOf(lecturer);
                                }
                            }
                            lecturerSpinner.setSelection(lecturerIndex);
                        }
                    }

                    @Override
                    public void onFailure(Call<LecturerModel> call, Throwable t) {

                    }
                });
    }

    private void getRoomByBuilding(String building, final Session session) {
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
                            int roomIndex = 0;
                            for (Room room : roomList) {
                                if (room.getId().equals(session.getRoomID())) {
                                    roomIndex = roomList.indexOf(room);
                                }
                            }
                            roomSpinner.setSelection(roomIndex);
                        }
                    }

                    @Override
                    public void onFailure(Call<List<Room>> call, Throwable t) {

                    }
                });
    }

    @Override
    public int getItemCount() {
        return sessionList.size();
    }

    @Override
    public void filter(String text) {
        sessionList.clear();
        if (text.isEmpty()) {
            sessionList.addAll(sessionListFull);
        } else {
            text = text.toLowerCase();
            for (Session session : sessionListFull) {
                if (session.getCourseId().toLowerCase().contains(text) || session.getLecturerName().toLowerCase().contains(text)
                        || Utils.weekdayFromInt(session.getWeekDay()).toLowerCase().contains(text)) {
                    sessionList.add(session);
                }
            }
        }
        notifyDataSetChanged();
    }

    class MyViewHolder extends RecyclerView.ViewHolder {

        SwipeLayout swipeLayout;
        LinearLayout contentLayout;
        ImageButton editButton;
        ImageButton detailsButton;
        ImageButton deleteButton;
        ImageView letterImage;
        TextView nameTextView;
        TextView detailsTextView;
        View bottomWrapperView;

        public MyViewHolder(View itemView) {
            super(itemView);
            swipeLayout = (SwipeLayout) itemView.findViewById(R.id.swipe_layout);
            contentLayout = (LinearLayout) itemView.findViewById(R.id.content_layout);
            editButton = (ImageButton) itemView.findViewById(R.id.btn_edit);
            detailsButton = (ImageButton) itemView.findViewById(R.id.btn_details);
            deleteButton = (ImageButton) itemView.findViewById(R.id.btn_delete);
            letterImage = (ImageView) itemView.findViewById(R.id.image_letter);
            nameTextView = (TextView) itemView.findViewById(R.id.tv_name);
            detailsTextView = (TextView) itemView.findViewById(R.id.tv_details);
            bottomWrapperView = itemView.findViewById(R.id.bottom_wrapper);
        }
    }
}
