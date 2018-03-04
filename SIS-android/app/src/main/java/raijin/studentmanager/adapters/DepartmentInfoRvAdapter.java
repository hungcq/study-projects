package raijin.studentmanager.adapters;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.afollestad.materialdialogs.MaterialDialog;
import com.daimajia.swipe.SwipeLayout;
import com.squareup.picasso.Picasso;

import java.util.List;

import raijin.studentmanager.R;
import raijin.studentmanager.Utils;
import raijin.studentmanager.interfaces.Filterable;
import raijin.studentmanager.models.department.Department;
import raijin.studentmanager.models.session.Session;

/**
 * Created by 1918 on 05-May-17.
 */

public class DepartmentInfoRvAdapter extends RecyclerView.Adapter<DepartmentInfoRvAdapter.MyViewHolder> implements Filterable {
    private List<Department> departmentList;
    private List<Department> departmentListFull;
    private Context context;

    public DepartmentInfoRvAdapter(List<Department> departmentList, List<Department> departmentListFull) {
        this.departmentList = departmentList;
        this.departmentListFull = departmentListFull;
    }

    @Override
    public DepartmentInfoRvAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        context = parent.getContext();
        View view = LayoutInflater.from(context).inflate(R.layout.row_department_info, parent, false);
        final DepartmentInfoRvAdapter.MyViewHolder myViewHolder = new DepartmentInfoRvAdapter.MyViewHolder(view);
        ImageButton detailsButton = (ImageButton) view.findViewById(R.id.btn_details);
        detailsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = myViewHolder.getAdapterPosition();
                showDetailsDialog(departmentList.get(position));
            }
        });
        LinearLayout contentLayout = (LinearLayout) view.findViewById(R.id.content_layout);
        contentLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                myViewHolder.swipeLayout.toggle();
            }
        });
        return myViewHolder;
    }

    private void showDetailsDialog(Department department) {
        MaterialDialog dialog = new MaterialDialog.Builder(context)
                .customView(R.layout.dialog_department_details, true)
                .positiveText(R.string.close)
                .build();
        ImageView imageView = (ImageView) dialog.findViewById(R.id.image_department);
        Picasso.with(context).load(department.getImage())
                .resize(500, 300).centerCrop()
                .placeholder(R.drawable.logo_bk)
                .error(R.drawable.logo_bk)
                .into(imageView);
        TextView departmentID = (TextView) dialog.findViewById(R.id.tv_department_id);
        departmentID.setText(department.getId());
        TextView departmentName = (TextView) dialog.findViewById(R.id.tv_department_name);
        departmentName.setText(department.getName());
        dialog.show();
    }

    @Override
    public void onBindViewHolder(DepartmentInfoRvAdapter.MyViewHolder holder, int position) {
        Department department = departmentList.get(position);
        holder.swipeLayout.setShowMode(SwipeLayout.ShowMode.PullOut);
        Picasso.with(context).load(department.getImage())
                .placeholder(R.drawable.logo_bk)
                .error(R.drawable.logo_bk)
                .resize(100, 100).centerCrop().into(holder.image);
        holder.departmentNameTextView.setText(department.getId());
        holder.departmentDetailsTextView.setText(department.getName());
    }

    @Override
    public int getItemCount() {
        return departmentList.size();
    }

    @Override
    public void filter(String text) {
        departmentList.clear();
        if (text.isEmpty()) {
            departmentList.addAll(departmentListFull);
        } else {
            text = text.toLowerCase();
            for (Department department : departmentListFull) {
                if (department.getId().toLowerCase().contains(text) || department.getName().toLowerCase().contains(text)) {
                    departmentList.add(department);
                }
            }
        }
        notifyDataSetChanged();
    }

    class MyViewHolder extends RecyclerView.ViewHolder {

        SwipeLayout swipeLayout;
        ImageButton registerButton;
        ImageButton detailsButton;
        ImageView image;
        TextView departmentNameTextView;
        TextView departmentDetailsTextView;
        View bottomWrapperView;

        public MyViewHolder(View itemView) {
            super(itemView);
            swipeLayout = (SwipeLayout) itemView.findViewById(R.id.swipe_layout);
            registerButton = (ImageButton) itemView.findViewById(R.id.btn_register);
            detailsButton = (ImageButton) itemView.findViewById(R.id.btn_details);
            image = (ImageView) itemView.findViewById(R.id.image_department);
            departmentNameTextView = (TextView) itemView.findViewById(R.id.tv_department_name);
            departmentDetailsTextView = (TextView) itemView.findViewById(R.id.tv_details);
            bottomWrapperView = itemView.findViewById(R.id.bottom_wrapper);
        }
    }
}
