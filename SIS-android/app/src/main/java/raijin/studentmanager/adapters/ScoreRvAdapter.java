package raijin.studentmanager.adapters;

import android.content.Context;
import android.support.v4.app.Fragment;
import android.support.v7.widget.RecyclerView;
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

import java.util.List;

import raijin.studentmanager.R;
import raijin.studentmanager.interfaces.Filterable;
import raijin.studentmanager.models.score.Score;
import raijin.studentmanager.models.student.StudentInSession;

/**
 * Created by 1918 on 01-Jun-17.
 */

public class ScoreRvAdapter extends RecyclerView.Adapter<ScoreRvAdapter.MyViewHolder> implements Filterable {

    private List<Score> scoreList;
    private List<Score> scoreListFull;
    private Context context;

    public ScoreRvAdapter(List<Score> scoreList, List<Score> scoreListFull) {
        this.scoreList = scoreList;
        this.scoreListFull = scoreListFull;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        context = parent.getContext();
        View view = LayoutInflater.from(context).inflate(R.layout.row_score, parent, false);
        final MyViewHolder myViewHolder = new MyViewHolder(view);
        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = myViewHolder.getAdapterPosition();
                showDetailsDialog(scoreList.get(position));
            }
        });
        return myViewHolder;
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        Score score = scoreList.get(position);
        ColorGenerator colorGenerator = ColorGenerator.MATERIAL;
        int color = colorGenerator.getColor(score.getScore().intValue() + "");
        TextDrawable textDrawable = TextDrawable.builder()
                .buildRound(score.getScore().intValue() + "", color);
        holder.letterImage.setImageDrawable(textDrawable);
        holder.nameTextView.setText(score.getCourseName());
        holder.detailsTextView.setText(score.getScore() + "");
    }

    @Override
    public int getItemCount() {
        return scoreList.size();
    }

    private void showDetailsDialog(Score score) {
        ColorGenerator colorGenerator = ColorGenerator.MATERIAL;
        int color = colorGenerator.getColor(score.getScore().intValue() + "");
        TextDrawable textDrawable = TextDrawable.builder()
                .beginConfig().height(150).width(150).endConfig()
                .buildRound(score.getScore().intValue() + "", color);
        MaterialDialog dialog = new MaterialDialog.Builder(context)
                .title(score.getCourseName())
                .customView(R.layout.dialog_score_details, true)
                .positiveText(R.string.close)
                .icon(textDrawable)
                .limitIconToDefaultSize()
                .build();
        TextView courseID = (TextView) dialog.findViewById(R.id.tv_course_id);
        courseID.setText(score.getCourseId());
        TextView courseName = (TextView) dialog.findViewById(R.id.tv_course_name);
        courseName.setText(score.getCourseName());
        TextView scoreTextView = (TextView) dialog.findViewById(R.id.tv_score);
        scoreTextView.setText(score.getScore() + "");
        dialog.show();
    }

    @Override
    public void filter(String text) {
        scoreList.clear();
        if (text.isEmpty()) {
            scoreList.addAll(scoreListFull);
        } else {
            text = text.toLowerCase();
            for (Score score : scoreListFull) {
                if (score.getCourseName().toLowerCase().contains(text)
                        || score.getScore().toString().toLowerCase().contains(text)) {
                    scoreList.add(score);
                }
            }
        }
        notifyDataSetChanged();
    }

    class MyViewHolder extends RecyclerView.ViewHolder {

        ImageView letterImage;
        TextView nameTextView;
        TextView detailsTextView;

        public MyViewHolder(View itemView) {
            super(itemView);
            letterImage = (ImageView) itemView.findViewById(R.id.image_letter);
            nameTextView = (TextView) itemView.findViewById(R.id.tv_name);
            detailsTextView = (TextView) itemView.findViewById(R.id.tv_details);
        }
    }
}
