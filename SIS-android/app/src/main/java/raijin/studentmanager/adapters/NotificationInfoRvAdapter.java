package raijin.studentmanager.adapters;

import android.content.Context;
import android.support.v4.app.Fragment;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.afollestad.materialdialogs.MaterialDialog;
import com.amulyakhare.textdrawable.TextDrawable;
import com.amulyakhare.textdrawable.util.ColorGenerator;

import java.util.List;

import raijin.studentmanager.R;
import raijin.studentmanager.Utils;
import raijin.studentmanager.interfaces.Filterable;
import raijin.studentmanager.models.notification.Noti;
import raijin.studentmanager.models.session.Session;

/**
 * Created by 1918 on 16-Jun-17.
 */

public class NotificationInfoRvAdapter extends RecyclerView.Adapter<NotificationInfoRvAdapter.MyViewHolder> implements Filterable {

    private Context context;
    private List<Noti> notiList;
    private List<Noti> notiListFull;

    public NotificationInfoRvAdapter(List<Noti> notiList, List<Noti> notiListFull) {
        this.notiList = notiList;
        this.notiListFull = notiListFull;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        context = parent.getContext();
        View view = LayoutInflater.from(context).inflate(R.layout.row_notification_info, parent, false);
        final MyViewHolder myViewHolder = new MyViewHolder(view);
        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = myViewHolder.getAdapterPosition();
                showDetailsDialog(notiList.get(position));
            }
        });
        return myViewHolder;
    }

    private void showDetailsDialog(Noti noti) {
        ColorGenerator colorGenerator = ColorGenerator.MATERIAL;
        int color = colorGenerator.getColor(noti.getCourse().charAt(0) + "");
        TextDrawable textDrawable = TextDrawable.builder()
                .beginConfig().height(150).width(150).endConfig()
                .buildRound(noti.getCourse().charAt(0) + "", color);
        MaterialDialog dialog = new MaterialDialog.Builder(context)
                .title(noti.getTitle())
                .customView(R.layout.dialog_noti_details, true)
                .positiveText(R.string.close)
                .icon(textDrawable)
                .limitIconToDefaultSize()
                .build();

        TextView title = (TextView) dialog.findViewById(R.id.tv_title);
        TextView course = (TextView) dialog.findViewById(R.id.tv_course);
        TextView from = (TextView) dialog.findViewById(R.id.tv_from);
        TextView sendTime = (TextView) dialog.findViewById(R.id.tv_send_time);
        TextView content = (TextView) dialog.findViewById(R.id.tv_content);
        title.setText(noti.getTitle());
        course.setText(noti.getCourse());
        from.setText(noti.getLecturer());
        sendTime.setText(noti.getDate());
        content.setText(noti.getContent());
        dialog.show();
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        Noti noti = notiList.get(position);
        ColorGenerator colorGenerator = ColorGenerator.MATERIAL;
        int color = colorGenerator.getColor(noti.getCourse().charAt(0) + "");
        TextDrawable textDrawable = TextDrawable.builder()
                .buildRound(noti.getCourse().charAt(0) + "", color);
        holder.letterImage.setImageDrawable(textDrawable);
        holder.nameTextView.setText(noti.getTitle());
        holder.detailsTextView.setText(noti.getCourse() + "\n" + noti.getDate());
    }

    @Override
    public int getItemCount() {
        return notiList.size();
    }

    @Override
    public void filter(String text) {
        notiList.clear();
        if (text.isEmpty()) {
            notiList.addAll(notiListFull);
        } else {
            text = text.toLowerCase();
            for (Noti noti : notiListFull) {
                if (noti.getTitle().toLowerCase().contains(text) || noti.getCourse().toLowerCase().contains(text)) {
                    notiList.add(noti);
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
