package raijin.studentmanager.adapters;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.support.v7.widget.RecyclerView;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import com.afollestad.materialdialogs.DialogAction;
import com.afollestad.materialdialogs.MaterialDialog;
import com.amulyakhare.textdrawable.TextDrawable;
import com.amulyakhare.textdrawable.util.ColorGenerator;

import java.util.ArrayList;
import java.util.List;

import raijin.studentmanager.R;
import raijin.studentmanager.fragments.ScoreManageStudentFragment;
import raijin.studentmanager.interfaces.Filterable;
import raijin.studentmanager.models.ResultCheck;
import raijin.studentmanager.models.notification.Noti;
import raijin.studentmanager.models.score.Score;
import raijin.studentmanager.models.student.StudentInSession;
import raijin.studentmanager.webservices.ScoreAPI;
import raijin.studentmanager.webservices.ServiceFactory;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Created by 1918 on 01-Jun-17.
 */

public class StudentSimpleRvAdapter extends RecyclerView.Adapter<StudentSimpleRvAdapter.MyViewHolder> implements Filterable {

    private Context context;
    private List<StudentInSession> studentList;
    private List<StudentInSession> studentListFull;
    private Fragment fragment;

    public StudentSimpleRvAdapter(List<StudentInSession> studentList, List<StudentInSession> studentListFull, Fragment fragment) {
        this.studentList = studentList;
        this.studentListFull = studentListFull;
        this.fragment = fragment;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        context = parent.getContext();
        View view = LayoutInflater.from(context).inflate(R.layout.row_student_score, parent, false);
        final MyViewHolder myViewHolder = new MyViewHolder(view);
        myViewHolder.scoreEditText.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                int position = myViewHolder.getAdapterPosition();
                try {
                    studentList.get(position).setScore(Double.parseDouble(myViewHolder.scoreEditText.getText().toString()));
                    studentListFull.get(position).setScore(Double.parseDouble(myViewHolder.scoreEditText.getText().toString()));
                } catch (NumberFormatException ex) {

                }
            }
        });
        return myViewHolder;
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        StudentInSession student = studentList.get(position);
        ColorGenerator colorGenerator = ColorGenerator.MATERIAL;
        int color = colorGenerator.getColor(student.getFirstName().charAt(0) + "");
        TextDrawable textDrawable = TextDrawable.builder()
                .buildRound(student.getFirstName().charAt(0) + "", color);
        holder.letterImage.setImageDrawable(textDrawable);
        holder.nameTextView.setText(student.getUsername());
        holder.detailsTextView.setText(student.getLastName() + " " + student.getFirstName());
        holder.scoreEditText.setText(student.getScore() + "");
    }

    @Override
    public int getItemCount() {
        return studentList.size();
    }

    private void showEditDialog(final int sessionID, final StudentInSession student) {
        ColorGenerator colorGenerator = ColorGenerator.MATERIAL;
        int color = colorGenerator.getColor(sessionID + "");
        TextDrawable textDrawable = TextDrawable.builder()
                .beginConfig().height(150).width(150).endConfig()
                .buildRound(sessionID + "", color);
        MaterialDialog dialog = new MaterialDialog.Builder(context)
                .title(student.getUsername())
                .customView(R.layout.dialog_score_edit, true)
                .positiveText(R.string.save)
                .negativeText(R.string.cancel)
                .onPositive(new MaterialDialog.SingleButtonCallback() {
                    @Override
                    public void onClick(@NonNull final MaterialDialog dialog, @NonNull DialogAction which) {
                        EditText scoreEditText = (EditText) dialog.findViewById(R.id.et_score);
                        List<Score> scoreList = new ArrayList<>();
                        scoreList.add(new Score(Double.parseDouble(scoreEditText.getText().toString()), student.getStudentId(), sessionID));
                        ServiceFactory.getInst().createService(ScoreAPI.class)
                                .updateScore(scoreList)
                                .enqueue(new Callback<ResultCheck>() {
                                    @Override
                                    public void onResponse(Call<ResultCheck> call, Response<ResultCheck> response) {
                                        if (response.isSuccessful()) {
                                            dialog.dismiss();
                                            ((ScoreManageStudentFragment) fragment).showSnackbar(R.string.score_updated);
                                        } else
                                            ((ScoreManageStudentFragment) fragment).showSnackbar(R.string.score_fail_update);
                                    }

                                    @Override
                                    public void onFailure(Call<ResultCheck> call, Throwable t) {
                                        ((ScoreManageStudentFragment) fragment).showSnackbar(R.string.score_fail_update);
                                    }
                                });
                    }
                })
                .icon(textDrawable)
                .limitIconToDefaultSize()
                .build();
        TextView sessionIdTextView = (TextView) dialog.findViewById(R.id.tv_session_id);
        TextView studentIdTextView = (TextView) dialog.findViewById(R.id.tv_student_id);
        TextView studentNameTextView = (TextView) dialog.findViewById(R.id.tv_student_name);
        sessionIdTextView.setText(sessionID + "");
        studentIdTextView.setText(student.getStudentId() + "");
        studentNameTextView.setText(student.getFirstName() + " " + student.getLastName());
        dialog.show();
    }

    @Override
    public void filter(String text) {
        studentList.clear();
        if (text.isEmpty()) {
            studentList.addAll(studentListFull);
        } else {
            text = text.toLowerCase();
            for (StudentInSession student : studentListFull) {
                if (student.getUsername().toLowerCase().contains(text) || student.getFirstName().toLowerCase().contains(text)
                        || student.getLastName().toLowerCase().contains(text)) {
                    studentList.add(student);
                }
            }
        }
        notifyDataSetChanged();
    }

    class MyViewHolder extends RecyclerView.ViewHolder {

        ImageView letterImage;
        TextView nameTextView;
        TextView detailsTextView;
        EditText scoreEditText;

        public MyViewHolder(View itemView) {
            super(itemView);
            letterImage = (ImageView) itemView.findViewById(R.id.image_letter);
            nameTextView = (TextView) itemView.findViewById(R.id.tv_name);
            detailsTextView = (TextView) itemView.findViewById(R.id.tv_details);
            scoreEditText = (EditText) itemView.findViewById(R.id.et_score);
        }
    }
}
