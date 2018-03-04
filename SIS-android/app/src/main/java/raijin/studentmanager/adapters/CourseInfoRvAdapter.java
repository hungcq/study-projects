package raijin.studentmanager.adapters;

import android.content.Context;
import android.support.v4.app.Fragment;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.afollestad.materialdialogs.MaterialDialog;
import com.amulyakhare.textdrawable.TextDrawable;
import com.amulyakhare.textdrawable.util.ColorGenerator;
import com.daimajia.swipe.SwipeLayout;

import java.util.ArrayList;
import java.util.List;

import raijin.studentmanager.Constants;
import raijin.studentmanager.R;
import raijin.studentmanager.Utils;
import raijin.studentmanager.fragments.CourseInfoFragment;
import raijin.studentmanager.interfaces.Filterable;
import raijin.studentmanager.models.ResultCheck;
import raijin.studentmanager.models.course.Course;
import raijin.studentmanager.models.score.RegisterSessionModel;
import raijin.studentmanager.models.session.Session;
import raijin.studentmanager.models.session.SessionModel;
import raijin.studentmanager.webservices.ScoreAPI;
import raijin.studentmanager.webservices.ServiceFactory;
import raijin.studentmanager.webservices.SessionAPI;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Created by 1918 on 02-May-17.
 */

public class CourseInfoRvAdapter extends RecyclerView.Adapter<CourseInfoRvAdapter.MyViewHolder> implements Filterable {

    private List<Course> courseList;
    private List<Course> courseListFull;
    private Context context;
    private Fragment fragment;

    public CourseInfoRvAdapter(List<Course> courseList, List<Course> courseListFull, Fragment fragment) {
        this.courseList = courseList;
        this.courseListFull = courseListFull;
        this.fragment = fragment;
    }

    @Override
    public CourseInfoRvAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        context = parent.getContext();
        View view = LayoutInflater.from(context).inflate(R.layout.row_course_info, parent, false);
        final MyViewHolder myViewHolder = new MyViewHolder(view);
        myViewHolder.registerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = myViewHolder.getAdapterPosition();
                showRegisterDialog(courseList.get(position));
            }
        });
        myViewHolder.detailsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = myViewHolder.getAdapterPosition();
                showDetailsDialog(courseList.get(position));
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

    private void showDetailsDialog(Course course) {
        ColorGenerator colorGenerator = ColorGenerator.MATERIAL;
        int color = colorGenerator.getColor(course.getName().charAt(0) + "");
        TextDrawable textDrawable = TextDrawable.builder()
                .beginConfig().height(150).width(150).endConfig()
                .buildRound(course.getName().charAt(0) + "", color);
        MaterialDialog dialog = new MaterialDialog.Builder(context)
                .title(course.getId())
                .customView(R.layout.dialog_course_details, true)
                .positiveText(R.string.close)
                .icon(textDrawable)
                .limitIconToDefaultSize()
                .build();
        TextView courseID = (TextView) dialog.findViewById(R.id.tv_course_id);
        courseID.setText(course.getId());
        TextView courseName = (TextView) dialog.findViewById(R.id.tv_name);
        courseName.setText(course.getName());
        TextView coursePrice = (TextView) dialog.findViewById(R.id.tv_course_price);
        coursePrice.setText(course.getCost() + "");
        TextView courseStatus = (TextView) dialog.findViewById(R.id.tv_course_status);
        courseStatus.setText(course.getActive() ? "Active" : "Inactive");
        TextView courseDepartment = (TextView) dialog.findViewById(R.id.tv_course_department);
        courseDepartment.setText(course.getDepartment());
        TextView courseRequirement = (TextView) dialog.findViewById(R.id.tv_requirement);
        String requirement = "";
        for (String name : course.getRequirementNames()) {
            requirement += name + "\n";
        }
        if (requirement.equals("")) {
            courseRequirement.setText("No requirement");
        } else courseRequirement.setText(requirement);
        dialog.show();
    }

    private void showRegisterDialog(final Course course) {
        if (course.getActive()) {
            ServiceFactory.getInst().createService(SessionAPI.class)
                    .callSessionByCourse(course.getId(), Constants.JSON_FORMAT, Constants.MAX_ITEM, 0).enqueue(new Callback<SessionModel>() {
                @Override
                public void onResponse(Call<SessionModel> call, final Response<SessionModel> response) {
                    if (response.isSuccessful()) {
                        ColorGenerator colorGenerator = ColorGenerator.MATERIAL;
                        int color = colorGenerator.getColor(course.getName().charAt(0) + "");
                        TextDrawable textDrawable = TextDrawable.builder()
                                .beginConfig().height(150).width(150).endConfig()
                                .buildRound(course.getName().charAt(0) + "", color);
                        final List<String> sessionList = new ArrayList<>();
                        for (Session session : response.body().getSessions()) {
                            sessionList.add(Utils.weekdayFromInt(session.getWeekDay()) + ", Period: " + session.getStartAt() + "-" + session.getEndAt() + "\n"
                                    + "Room: " + session.getRoom() + "\n"
                                    + "Enrolled: " + session.getEnrolled() + "/" + session.getMaxEnroll() + "\n"
                                    + "Lecturer: " + session.getLecturerName());
                        }
                        if (sessionList.size() > 0) {
                            new MaterialDialog.Builder(context).title(course.getId()).icon(textDrawable)
                                    .items(sessionList).itemsCallbackSingleChoice(0, new MaterialDialog.ListCallbackSingleChoice() {
                                @Override
                                public boolean onSelection(MaterialDialog dialog, View itemView, int which, CharSequence text) {
                                    List<Integer> sessionIdList = new ArrayList<>();
                                    sessionIdList.add(response.body().getSessions().get(which).getId());
                                    RegisterSessionModel model = new RegisterSessionModel();
                                    model.setSessionIdList(sessionIdList);
                                    ServiceFactory.getInst().createService(ScoreAPI.class)
                                            .registerManySession(model, Constants.JSON_FORMAT)
                                            .enqueue(new Callback<ResultCheck>() {
                                                @Override
                                                public void onResponse(Call<ResultCheck> call, Response<ResultCheck> response) {
                                                    if (response.isSuccessful()) {
                                                        if (response.body().getResult()) {
                                                            ((CourseInfoFragment) fragment).showSnackbar(R.string.register_success);
                                                        } else {
                                                            ((CourseInfoFragment) fragment).showSnackbar(R.string.register_fail);
                                                        }
                                                    }
                                                }

                                                @Override
                                                public void onFailure(Call<ResultCheck> call, Throwable t) {
                                                    ((CourseInfoFragment) fragment).showSnackbar(R.string.register_fail);
                                                }
                                            });
                                    return true;
                                }
                            }).positiveText(R.string.register).negativeText(R.string.cancel).show();
                        } else {
                            ((CourseInfoFragment) fragment).showSnackbar(R.string.no_session);
                        }
                    }
                }

                @Override
                public void onFailure(Call<SessionModel> call, Throwable t) {

                }
            });
        } else {
            ((CourseInfoFragment) fragment).showSnackbar(R.string.course_close);
        }
    }

    @Override
    public void onBindViewHolder(CourseInfoRvAdapter.MyViewHolder holder, int position) {
        Course course = courseList.get(position);
        holder.swipeLayout.setShowMode(SwipeLayout.ShowMode.PullOut);
        ColorGenerator colorGenerator = ColorGenerator.MATERIAL;
        int color = colorGenerator.getColor(course.getName().charAt(0) + "");
        TextDrawable textDrawable = TextDrawable.builder()
                .buildRound(course.getName().charAt(0) + "", color);
        holder.letterImage.setImageDrawable(textDrawable);
        holder.courseNameTextView.setText(course.getId());
        holder.courseDetailsTextView.setText(course.getName());
    }

    @Override
    public int getItemCount() {
        return courseList.size();
    }

    @Override
    public void filter(String text) {
        courseList.clear();
        if (text.isEmpty()) {
            courseList.addAll(courseListFull);
        } else {
            text = text.toLowerCase();
            for (Course course : courseListFull) {
                if (course.getId().toLowerCase().contains(text) || course.getName().toLowerCase().contains(text)) {
                    courseList.add(course);
                }
            }
        }
        notifyDataSetChanged();
    }

    class MyViewHolder extends RecyclerView.ViewHolder {

        SwipeLayout swipeLayout;
        LinearLayout contentLayout;
        ImageButton registerButton;
        ImageButton detailsButton;
        ImageView letterImage;
        TextView courseNameTextView;
        TextView courseDetailsTextView;
        View bottomWrapperView;

        public MyViewHolder(View itemView) {
            super(itemView);
            swipeLayout = (SwipeLayout) itemView.findViewById(R.id.swipe_layout);
            contentLayout = (LinearLayout) itemView.findViewById(R.id.content_layout);
            registerButton = (ImageButton) itemView.findViewById(R.id.btn_register);
            detailsButton = (ImageButton) itemView.findViewById(R.id.btn_details);
            letterImage = (ImageView) itemView.findViewById(R.id.image_letter);
            courseNameTextView = (TextView) itemView.findViewById(R.id.tv_name);
            courseDetailsTextView = (TextView) itemView.findViewById(R.id.tv_details);
            bottomWrapperView = itemView.findViewById(R.id.bottom_wrapper);
        }
    }
}
