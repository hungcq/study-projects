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

import org.w3c.dom.Text;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import raijin.studentmanager.R;
import raijin.studentmanager.Utils;
import raijin.studentmanager.interfaces.Filterable;
import raijin.studentmanager.interfaces.Searchable;
import raijin.studentmanager.models.session.Session;

/**
 * Created by 1918 on 30-May-17.
 */

public class TimetableRvAdapter extends RecyclerView.Adapter<TimetableRvAdapter.MyViewHolder> implements Filterable {

    private List<Session> sessionList;
    private List<Session> sessionListFull;
    private Context context;

    public TimetableRvAdapter(List<Session> sessionList, List<Session> sessionListFull) {
        this.sessionList = sessionList;
        this.sessionListFull = sessionListFull;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        context = parent.getContext();
        View view = LayoutInflater.from(context).inflate(R.layout.row_timetable, parent, false);
        final MyViewHolder myViewHolder = new MyViewHolder(view);
        myViewHolder.detailsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = myViewHolder.getAdapterPosition();
                showDetailsDialog(sessionList.get(position));
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
        int color = colorGenerator.getColor(session.getWeekDay() + "");
        TextDrawable textDrawable = TextDrawable.builder()
                .buildRound(session.getWeekDay() + "", color);
        holder.letterImage.setImageDrawable(textDrawable);
        holder.nameTextView.setText(session.getCourseName());
        holder.detailsTextView.setText(Utils.weekdayFromInt(session.getWeekDay())
                + ", Period: " + session.getStartAt() + "-" + session.getEndAt() + " at " + session.getRoom());
    }

    @Override
    public int getItemCount() {
        return sessionList.size();
    }

    private void showDetailsDialog(Session session) {
        ColorGenerator colorGenerator = ColorGenerator.MATERIAL;
        int color = colorGenerator.getColor(session.getWeekDay() + "");
        TextDrawable textDrawable = TextDrawable.builder()
                .beginConfig().height(150).width(150).endConfig()
                .buildRound(session.getWeekDay() + "", color);
        MaterialDialog dialog = new MaterialDialog.Builder(context)
                .title(session.getCourseName())
                .customView(R.layout.dialog_timetable_details, true)
                .positiveText(R.string.close)
                .icon(textDrawable)
                .limitIconToDefaultSize()
                .build();
        TextView course = (TextView) dialog.findViewById(R.id.tv_course);
        course.setText(session.getCourseName());
        TextView lecturer = (TextView) dialog.findViewById(R.id.tv_lecturer);
        lecturer.setText(session.getLecturerName());
        TextView room = (TextView) dialog.findViewById(R.id.tv_room);
        room.setText(session.getRoom());
        TextView period = (TextView) dialog.findViewById(R.id.tv_period);
        period.setText(session.getStartAt() + "-" + session.getEndAt());
        TextView weekday = (TextView) dialog.findViewById(R.id.tv_weekday);
        weekday.setText(Utils.weekdayFromInt(session.getWeekDay()));
        dialog.show();
    }

    @Override
    public void filter(String text) {
        sessionList.clear();
        if (text.isEmpty()) {
            sessionList.addAll(sessionListFull);
        } else {
            text = text.toLowerCase();
            for (Session session : sessionListFull) {
                if (session.getCourseName().toLowerCase().contains(text)
                        || Utils.weekdayFromInt(session.getWeekDay()).toLowerCase().contains(text)) {
                    sessionList.add(session);
                }
            }
        }
        Collections.sort(sessionList, new Comparator<Session>() {
            @Override
            public int compare(Session o1, Session o2) {
                return o1.getWeekDay() - o2.getWeekDay();
            }
        });
        notifyDataSetChanged();
    }

    class MyViewHolder extends RecyclerView.ViewHolder {

        SwipeLayout swipeLayout;
        LinearLayout contentLayout;
        ImageButton detailsButton;
        ImageView letterImage;
        TextView nameTextView;
        TextView detailsTextView;
        View bottomWrapperView;

        public MyViewHolder(View itemView) {
            super(itemView);
            swipeLayout = (SwipeLayout) itemView.findViewById(R.id.swipe_layout);
            contentLayout = (LinearLayout) itemView.findViewById(R.id.content_layout);
            detailsButton = (ImageButton) itemView.findViewById(R.id.btn_details);
            letterImage = (ImageView) itemView.findViewById(R.id.image_letter);
            nameTextView = (TextView) itemView.findViewById(R.id.tv_name);
            detailsTextView = (TextView) itemView.findViewById(R.id.tv_details);
            bottomWrapperView = itemView.findViewById(R.id.bottom_wrapper);
        }
    }
}
