package raijin.studentmanager.adapters;

import android.content.Context;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.amulyakhare.textdrawable.TextDrawable;
import com.amulyakhare.textdrawable.util.ColorGenerator;

import java.util.List;

import raijin.studentmanager.R;
import raijin.studentmanager.Utils;
import raijin.studentmanager.fragments.ScoreManageSessionFragment;
import raijin.studentmanager.fragments.ScoreManageStudentFragment;
import raijin.studentmanager.interfaces.Filterable;
import raijin.studentmanager.models.session.Session;
import raijin.studentmanager.models.student.Student;

/**
 * Created by 1918 on 01-Jun-17.
 */

public class SessionSimpleRvAdapter extends RecyclerView.Adapter<SessionSimpleRvAdapter.MyViewHolder> implements Filterable {

    private Context context;
    private List<Session> sessionList;
    private List<Session> sessionListFull;

    public SessionSimpleRvAdapter(List<Session> sessionList, List<Session> sessionListFull) {
        this.sessionList = sessionList;
        this.sessionListFull = sessionListFull;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        context = parent.getContext();
        View view = LayoutInflater.from(context).inflate(R.layout.row_session_simple, parent, false);
        final MyViewHolder myViewHolder = new MyViewHolder(view);
        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = myViewHolder.getAdapterPosition();
                Bundle bundle = new Bundle();
                bundle.putInt("session_id", sessionList.get(position).getId());
                ScoreManageStudentFragment fragment = new ScoreManageStudentFragment();
                fragment.setArguments(bundle);
                ((AppCompatActivity) context).getSupportFragmentManager()
                        .beginTransaction()
                        .setCustomAnimations(R.anim.trans_in, R.anim.trans_out, R.anim.trans_back_in, R.anim.trans_back_out)
                        .replace(R.id.container, fragment)
                        .addToBackStack(null).commit();
            }
        });
        return myViewHolder;
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        Session session = sessionList.get(position);
        ColorGenerator colorGenerator = ColorGenerator.MATERIAL;
        int color = colorGenerator.getColor(session.getCourseId().charAt(0) + "");
        TextDrawable textDrawable = TextDrawable.builder()
                .buildRound(session.getCourseId().charAt(0) + "", color);
        holder.letterImage.setImageDrawable(textDrawable);
        holder.nameTextView.setText(session.getCourseId());
        holder.detailsTextView.setText(session.getCourseName() + " - "
                + Utils.weekdayFromInt(session.getWeekDay()) + ", Period: " + session.getStartAt() + "-" + session.getEndAt());
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
                if (session.getCourseId().toLowerCase().contains(text) || session.getCourseName().toLowerCase().contains(text)
                        || Utils.weekdayFromInt(session.getWeekDay()).toLowerCase().contains(text)) {
                    sessionList.add(session);
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
