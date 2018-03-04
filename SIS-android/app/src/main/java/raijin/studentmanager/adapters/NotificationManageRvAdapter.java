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
import raijin.studentmanager.fragments.NotificationManageFragment;
import raijin.studentmanager.interfaces.Filterable;
import raijin.studentmanager.models.notification.Noti;
import raijin.studentmanager.models.session.Session;
import raijin.studentmanager.webservices.NotiAPI;
import raijin.studentmanager.webservices.ServiceFactory;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Created by 1918 on 17-Jun-17.
 */

public class NotificationManageRvAdapter extends RecyclerView.Adapter<NotificationManageRvAdapter.MyViewHolder> implements Filterable {

    private List<Noti> notiList;
    private List<Noti> notiListFull;
    private List<Session> sessionList;
    private Fragment fragment;
    private Context context;

    public NotificationManageRvAdapter(List<Noti> notiList, List<Noti> notiListFull, List<Session> sessionList, Fragment fragment) {
        this.notiList = notiList;
        this.notiListFull = notiListFull;
        this.sessionList = sessionList;
        this.fragment = fragment;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        context = parent.getContext();
        View view = LayoutInflater.from(context).inflate(R.layout.row_notification_manage, parent, false);
        final MyViewHolder myViewHolder = new MyViewHolder(view);
        myViewHolder.editButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = myViewHolder.getAdapterPosition();
                showEditDialog(notiList.get(position), position);
            }
        });
        myViewHolder.detailsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = myViewHolder.getAdapterPosition();
                showDetailsDialog(notiList.get(position));
            }
        });
        myViewHolder.deleteButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = myViewHolder.getAdapterPosition();
                deleteNoti(notiList.get(position), position);
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
        Noti noti = notiList.get(position);
        holder.swipeLayout.setShowMode(SwipeLayout.ShowMode.PullOut);
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

    private void showEditDialog(final Noti noti, final int position) {
        ColorGenerator colorGenerator = ColorGenerator.MATERIAL;
        int color = colorGenerator.getColor(noti.getCourse().charAt(0) + "");
        TextDrawable textDrawable = TextDrawable.builder()
                .beginConfig().height(150).width(150).endConfig()
                .buildRound(noti.getCourse().charAt(0) + "", color);
        MaterialDialog dialog = new MaterialDialog.Builder(context)
                .title(noti.getTitle())
                .customView(R.layout.dialog_noti_edit, true)
                .positiveText(R.string.save)
                .negativeText(R.string.cancel)
                .onPositive(new MaterialDialog.SingleButtonCallback() {
                    @Override
                    public void onClick(@NonNull MaterialDialog dialog, @NonNull DialogAction which) {
                        EditText title = (EditText) dialog.findViewById(R.id.et_title);
                        EditText content = (EditText) dialog.findViewById(R.id.et_content);
                        Spinner spinner = (Spinner) dialog.findViewById(R.id.spinner);
                        final Session session = (Session) spinner.getSelectedItem();
                        Noti noti1 = new Noti(title.getText().toString(), content.getText().toString(), session.getId());
                        ServiceFactory.getInst().createService(NotiAPI.class).updateNoti(noti.getId(), noti1)
                                .enqueue(new Callback<Noti>() {
                                    @Override
                                    public void onResponse(Call<Noti> call, Response<Noti> response) {
                                        if (response.isSuccessful()) {
                                            ((NotificationManageFragment) fragment).showSnackbar(R.string.noti_updated);
                                            Noti noti2 = response.body();
                                            noti2.setCourse(session.getCourseName());
                                            noti2.setLecturer(session.getLecturerName());
                                            noti.setData(noti2);
                                            notifyItemChanged(position);
                                        } else ((NotificationManageFragment) fragment).showSnackbar(R.string.noti_fail_update);
                                    }

                                    @Override
                                    public void onFailure(Call<Noti> call, Throwable t) {
                                        ((NotificationManageFragment) fragment).showSnackbar(R.string.noti_fail_update);
                                    }
                                });
                    }
                })
                .icon(textDrawable)
                .limitIconToDefaultSize()
                .build();
        EditText title = (EditText) dialog.findViewById(R.id.et_title);
        EditText content = (EditText) dialog.findViewById(R.id.et_content);
        Spinner spinner = (Spinner) dialog.findViewById(R.id.spinner);
        title.setText(noti.getTitle());
        content.setText(noti.getContent());
        ArrayAdapter spinnerAdapter = new ArrayAdapter<>(context, android.R.layout.simple_spinner_item, sessionList);
        spinnerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(spinnerAdapter);
        int index = 0;
        for (int i = 0; i < sessionList.size(); i++) {
            if (sessionList.get(i).getId().equals(noti.getSessionId())) {
                index = i;
            }
        }
        spinner.setSelection(index);
        spinner.setEnabled(false);
        dialog.show();
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

    private void deleteNoti(final Noti noti, final int position) {
        MaterialDialog dialog = new MaterialDialog.Builder(context)
                .title(R.string.confirm_delete_noti)
                .negativeText(R.string.cancel)
                .positiveText(R.string.delete)
                .onPositive(new MaterialDialog.SingleButtonCallback() {
                    @Override
                    public void onClick(@NonNull MaterialDialog dialog, @NonNull DialogAction which) {
                        ServiceFactory.getInst().createService(NotiAPI.class).deleteNoti(noti.getId())
                                .enqueue(new Callback<Void>() {
                                    @Override
                                    public void onResponse(Call<Void> call, Response<Void> response) {
                                        if (response.isSuccessful()) {
                                            ((NotificationManageFragment) fragment).showSnackbar(R.string.deleted);
                                            notiList.remove(noti);
                                            notiListFull.remove(noti);
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
