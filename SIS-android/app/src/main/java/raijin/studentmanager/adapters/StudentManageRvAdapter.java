package raijin.studentmanager.adapters;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.TextView;

import com.afollestad.materialdialogs.DialogAction;
import com.afollestad.materialdialogs.MaterialDialog;
import com.amulyakhare.textdrawable.TextDrawable;
import com.amulyakhare.textdrawable.util.ColorGenerator;
import com.daimajia.swipe.SwipeLayout;

import java.util.List;

import raijin.studentmanager.R;
import raijin.studentmanager.fragments.StudentManageFragment;
import raijin.studentmanager.models.student.Student;
import raijin.studentmanager.webservices.ServiceFactory;
import raijin.studentmanager.webservices.StudentAPI;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Created by 1918 on 07-May-17.
 */

public class StudentManageRvAdapter extends RecyclerView.Adapter<StudentManageRvAdapter.MyViewHolder> {

    private List<Student> studentList;
    private List<String> classList;
    private Context context;
    private Fragment fragment;

    public StudentManageRvAdapter(Fragment fragment, List<Student> studentList, List<String> classList) {
        this.fragment = fragment;
        this.studentList = studentList;
        this.classList = classList;
    }

    @Override
    public StudentManageRvAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        context = parent.getContext();
        View view = LayoutInflater.from(context).inflate(R.layout.row_student_manage, parent, false);
        final MyViewHolder myViewHolder = new MyViewHolder(view);
        myViewHolder.editButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = myViewHolder.getAdapterPosition();
                showEditDialog(studentList.get(position), position);
            }
        });
        myViewHolder.detailsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = myViewHolder.getAdapterPosition();
                showDetailsDialog(studentList.get(position));
            }
        });
        myViewHolder.deleteButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = myViewHolder.getAdapterPosition();
                deleteStudent(studentList.get(position), position);
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
        Student student = studentList.get(position);
        holder.swipeLayout.setShowMode(SwipeLayout.ShowMode.PullOut);
        ColorGenerator colorGenerator = ColorGenerator.MATERIAL;
        int color = colorGenerator.getColor(student.getFirstName().charAt(0) + "");
        TextDrawable textDrawable = TextDrawable.builder()
                .buildRound(student.getFirstName().charAt(0) + "", color);
        holder.letterImage.setImageDrawable(textDrawable);
        holder.studentNameTextView.setText(student.getUsername());
        holder.studentClassTextView.setText(student.getClassId());
        holder.studentDetailsTextView.setText(student.getLastName() + " " + student.getFirstName());
    }

    private void showDetailsDialog(Student student) {
        ColorGenerator colorGenerator = ColorGenerator.MATERIAL;
        int color = colorGenerator.getColor(student.getFirstName().charAt(0) + "");
        TextDrawable textDrawable = TextDrawable.builder()
                .beginConfig().height(150).width(150).endConfig()
                .buildRound(student.getFirstName().charAt(0) + "", color);
        MaterialDialog dialog = new MaterialDialog.Builder(context)
                .title(student.getUsername())
                .customView(R.layout.dialog_student_details, true)
                .positiveText(R.string.close)
                .icon(textDrawable)
                .limitIconToDefaultSize()
                .build();
        TextView username = (TextView) dialog.findViewById(R.id.tv_username);
        username.setText(student.getUsername());
        TextView name = (TextView) dialog.findViewById(R.id.tv_name);
        name.setText(student.getLastName() + " " + student.getFirstName());
        TextView classes = (TextView) dialog.findViewById(R.id.tv_class);
        classes.setText(student.getClassId());
        dialog.show();
    }

    private void showEditDialog(final Student student, final int position) {
        ColorGenerator colorGenerator = ColorGenerator.MATERIAL;
        int color = colorGenerator.getColor(student.getFirstName().charAt(0) + "");
        TextDrawable textDrawable = TextDrawable.builder()
                .beginConfig().height(150).width(150).endConfig()
                .buildRound(student.getFirstName().charAt(0) + "", color);
        MaterialDialog dialog = new MaterialDialog.Builder(context)
                .title(student.getUsername())
                .customView(R.layout.dialog_student_edit, true)
                .positiveText(R.string.save)
                .negativeText(R.string.cancel)
                .onPositive(new MaterialDialog.SingleButtonCallback() {
                    @Override
                    public void onClick(@NonNull MaterialDialog dialog, @NonNull DialogAction which) {
                        EditText firstNameEditText = (EditText) dialog.findViewById(R.id.et_firstname);
                        EditText lastNameEditText = (EditText) dialog.findViewById(R.id.et_lastname);
                        Spinner spinner = (Spinner) dialog.findViewById(R.id.spinner);
                        Student student1 = new Student(firstNameEditText.getText().toString(), lastNameEditText.getText().toString(),
                                spinner.getSelectedItem().toString());
                        ServiceFactory.getInst().createService(StudentAPI.class).updateStudent(student.getId(), student1)
                                .enqueue(new Callback<Student>() {
                                    @Override
                                    public void onResponse(Call<Student> call, Response<Student> response) {
                                        if (response.isSuccessful()) {
                                            ((StudentManageFragment) fragment).showSnackbar(R.string.student_updated);
                                            Student student2 = response.body();
                                            student.setData(student2);
                                            notifyItemChanged(position);
                                        } else
                                            ((StudentManageFragment) fragment).showSnackbar(R.string.student_fail_update);
                                    }

                                    @Override
                                    public void onFailure(Call<Student> call, Throwable t) {
                                        ((StudentManageFragment) fragment).showSnackbar(R.string.student_fail_update);
                                    }
                                });
                    }
                })
                .icon(textDrawable)
                .limitIconToDefaultSize()
                .build();

        EditText usernameEditText = (EditText) dialog.findViewById(R.id.et_username);
        EditText firstNameEditText = (EditText) dialog.findViewById(R.id.et_firstname);
        EditText lastNameEditText = (EditText) dialog.findViewById(R.id.et_lastname);
        EditText passwordEditText = (EditText) dialog.findViewById(R.id.et_password);
        passwordEditText.setEnabled(false);
        Spinner spinner = (Spinner) dialog.findViewById(R.id.spinner);
        ArrayAdapter<String> adapter = new ArrayAdapter<>(context, android.R.layout.simple_spinner_item, classList);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(adapter);
        spinner.setSelection(classList.indexOf(student.getClassId()));
        firstNameEditText.setText(student.getFirstName());
        lastNameEditText.setText(student.getLastName());
        usernameEditText.setText(student.getUsername());
        usernameEditText.setEnabled(false);
        dialog.show();
    }

    private void deleteStudent(final Student student, final int position) {
        MaterialDialog dialog = new MaterialDialog.Builder(context)
                .title(R.string.confirm_delete_student)
                .negativeText(R.string.cancel)
                .positiveText(R.string.delete)
                .onPositive(new MaterialDialog.SingleButtonCallback() {
                    @Override
                    public void onClick(@NonNull MaterialDialog dialog, @NonNull DialogAction which) {
                        ServiceFactory.getInst().createService(StudentAPI.class).deleteStudent(student.getId())
                                .enqueue(new Callback<Void>() {
                                    @Override
                                    public void onResponse(Call<Void> call, Response<Void> response) {
                                        if (response.isSuccessful()) {
                                            ((StudentManageFragment) fragment).showSnackbar(R.string.student_deleted);
                                            studentList.remove(student);
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
        return studentList.size();
    }

    class MyViewHolder extends RecyclerView.ViewHolder {

        SwipeLayout swipeLayout;
        LinearLayout contentLayout;
        ImageButton editButton;
        ImageButton detailsButton;
        ImageButton deleteButton;
        ImageView letterImage;
        TextView studentNameTextView;
        TextView studentDetailsTextView;
        TextView studentClassTextView;
        View bottomWrapperView;

        public MyViewHolder(View itemView) {
            super(itemView);
            swipeLayout = (SwipeLayout) itemView.findViewById(R.id.swipe_layout);
            contentLayout = (LinearLayout) itemView.findViewById(R.id.content_layout);
            editButton = (ImageButton) itemView.findViewById(R.id.btn_edit);
            detailsButton = (ImageButton) itemView.findViewById(R.id.btn_details);
            deleteButton = (ImageButton) itemView.findViewById(R.id.btn_delete);
            letterImage = (ImageView) itemView.findViewById(R.id.image_letter);
            studentNameTextView = (TextView) itemView.findViewById(R.id.tv_name);
            studentDetailsTextView = (TextView) itemView.findViewById(R.id.tv_details);
            studentClassTextView = (TextView) itemView.findViewById(R.id.tv_class);
            bottomWrapperView = itemView.findViewById(R.id.bottom_wrapper);
        }
    }
}
