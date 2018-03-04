package raijin.studentmanager.adapters;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
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
import java.util.List;

import raijin.studentmanager.R;
import raijin.studentmanager.fragments.CourseManageFragment;
import raijin.studentmanager.interfaces.Filterable;
import raijin.studentmanager.models.course.Course;
import raijin.studentmanager.models.department.Department;
import raijin.studentmanager.webservices.CourseAPI;
import raijin.studentmanager.webservices.ServiceFactory;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Created by 1918 on 06-May-17.
 */

public class CourseManageRvAdapter extends RecyclerView.Adapter<CourseManageRvAdapter.MyViewHolder> implements Filterable {

    private List<Course> courseList;
    private List<Course> courseListFull;
    private List<Department> departmentList;
    private Context context;
    private Fragment fragment;

    public CourseManageRvAdapter(List<Course> courseList, List<Course> courseListFull, List<Department> departmentList, Fragment fragment) {
        this.courseList = courseList;
        this.courseListFull = courseListFull;
        this.departmentList = departmentList;
        this.fragment = fragment;
    }

    @Override
    public CourseManageRvAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        context = parent.getContext();
        View view = LayoutInflater.from(context).inflate(R.layout.row_course_manage, parent, false);
        final MyViewHolder myViewHolder = new MyViewHolder(view);
        myViewHolder.editButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = myViewHolder.getAdapterPosition();
                showEditDialog(courseList.get(position), position);
            }
        });
        myViewHolder.detailsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = myViewHolder.getAdapterPosition();
                showDetailsDialog(courseList.get(position));
            }
        });
        myViewHolder.deleteButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = myViewHolder.getAdapterPosition();
                deleteCourse(courseList.get(position), position);
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
        for (String name : course.getRequirements()) {
            requirement += name + "\n";
        }
        if (requirement.equals("")) {
            courseRequirement.setText("No requirement");
        } else courseRequirement.setText(requirement);
        dialog.show();
    }

    private void showEditDialog(final Course course, final int position) {
        final List<String> requirementList = new ArrayList<>();
        ColorGenerator colorGenerator = ColorGenerator.MATERIAL;
        int color = colorGenerator.getColor(course.getName().charAt(0) + "");
        TextDrawable textDrawable = TextDrawable.builder()
                .beginConfig().height(150).width(150).endConfig()
                .buildRound(course.getName().charAt(0) + "", color);
        MaterialDialog dialog = new MaterialDialog.Builder(context)
                .title(course.getId())
                .customView(R.layout.dialog_course_edit, true)
                .positiveText(R.string.save)
                .negativeText(R.string.cancel)
                .onPositive(new MaterialDialog.SingleButtonCallback() {
                    @Override
                    public void onClick(@NonNull MaterialDialog dialog, @NonNull DialogAction which) {
                        EditText courseNameEditText = (EditText) dialog.findViewById(R.id.et_course_name);
                        EditText coursePriceEditText = (EditText) dialog.findViewById(R.id.et_course_price);
                        RadioGroup courseRadioGroup = (RadioGroup) dialog.findViewById(R.id.rg_course_status);
                        boolean active = courseRadioGroup.getCheckedRadioButtonId() == R.id.radio_active;
                        int price = 0;
                        if (coursePriceEditText.getText().toString().equals(""))
                            price = 0;
                        else
                            price = Integer.parseInt(coursePriceEditText.getText().toString());
                        Course course1 = new Course(course.getId(), courseNameEditText.getText().toString(),
                                price, active,
                                course.getDepartment(), requirementList);
                        ServiceFactory.getInst().createService(CourseAPI.class).updateCourse(course.getId(), course1)
                                .enqueue(new Callback<Course>() {
                                    @Override
                                    public void onResponse(Call<Course> call, Response<Course> response) {
                                        if (response.isSuccessful()) {
                                            ((CourseManageFragment) fragment).showSnackbar(R.string.course_updated);
                                            Course course2 = response.body();
                                            course.setData(course2);
                                            notifyItemChanged(position);
                                        } else
                                            ((CourseManageFragment) fragment).showSnackbar(R.string.course_fail_update);
                                    }

                                    @Override
                                    public void onFailure(Call<Course> call, Throwable t) {
                                        ((CourseManageFragment) fragment).showSnackbar(R.string.course_fail_update);
                                    }
                                });
                    }
                })
                .icon(textDrawable)
                .limitIconToDefaultSize()
                .build();
        EditText courseID = (EditText) dialog.findViewById(R.id.et_course_id);
        courseID.setText(course.getId());
        courseID.setEnabled(false);
        EditText courseName = (EditText) dialog.findViewById(R.id.et_course_name);
        courseName.setText(course.getName());
        EditText coursePrice = (EditText) dialog.findViewById(R.id.et_course_price);
        coursePrice.setText(course.getCost() + "");
        RadioGroup courseRadioGroup = (RadioGroup) dialog.findViewById(R.id.rg_course_status);
        courseRadioGroup.check(course.getActive() ? R.id.radio_active : R.id.radio_inactive);
        Spinner spinner = (Spinner) dialog.findViewById(R.id.spinner);
        ArrayAdapter adapter = new ArrayAdapter<>(context, android.R.layout.simple_spinner_item, departmentList);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(adapter);
        int index = 0;
        for (int i = 0; i < departmentList.size(); i++) {
            if (departmentList.get(i).getId().equals(course.getDepartment())) {
                index = i;
            }
        }
        spinner.setSelection(index);
        spinner.setEnabled(false);
        final EditText requirementEditText = (EditText) dialog.findViewById(R.id.et_requirement);
        final TextView requirementTextView = (TextView) dialog.findViewById(R.id.tv_requirement);
        requirementList.addAll(course.getRequirements());
        String requirement1 = "";
        for (String requirement : requirementList) {
            requirement1 += requirement + "\n";
        }
        requirementTextView.setText(requirement1);
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
        dialog.show();
    }

    private void deleteCourse(final Course course, final int position) {
        MaterialDialog dialog = new MaterialDialog.Builder(context)
                .title(R.string.confirm_delete_course)
                .negativeText(R.string.cancel)
                .positiveText(R.string.delete)
                .onPositive(new MaterialDialog.SingleButtonCallback() {
                    @Override
                    public void onClick(@NonNull MaterialDialog dialog, @NonNull DialogAction which) {
                        ServiceFactory.getInst().createService(CourseAPI.class).deleteCourse(course.getId())
                                .enqueue(new Callback<Void>() {
                                    @Override
                                    public void onResponse(Call<Void> call, Response<Void> response) {
                                        if (response.isSuccessful()) {
                                            ((CourseManageFragment) fragment).showSnackbar(R.string.deleted);
                                            courseList.remove(course);
                                            courseListFull.remove(course);
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
        ImageButton editButton;
        ImageButton detailsButton;
        ImageButton deleteButton;
        ImageView letterImage;
        TextView courseNameTextView;
        TextView courseDetailsTextView;
        View bottomWrapperView;

        public MyViewHolder(View itemView) {
            super(itemView);
            swipeLayout = (SwipeLayout) itemView.findViewById(R.id.swipe_layout);
            contentLayout = (LinearLayout) itemView.findViewById(R.id.content_layout);
            editButton = (ImageButton) itemView.findViewById(R.id.btn_edit);
            detailsButton = (ImageButton) itemView.findViewById(R.id.btn_details);
            deleteButton = (ImageButton) itemView.findViewById(R.id.btn_delete);
            letterImage = (ImageView) itemView.findViewById(R.id.image_letter);
            courseNameTextView = (TextView) itemView.findViewById(R.id.tv_name);
            courseDetailsTextView = (TextView) itemView.findViewById(R.id.tv_details);
            bottomWrapperView = itemView.findViewById(R.id.bottom_wrapper);
        }
    }
}
