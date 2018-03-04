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
import raijin.studentmanager.fragments.ScoreManageSessionFragment;
import raijin.studentmanager.interfaces.Filterable;
import raijin.studentmanager.models.course.Course;

/**
 * Created by 1918 on 01-Jun-17.
 */

public class CourseSimpleRvAdapter extends RecyclerView.Adapter<CourseSimpleRvAdapter.MyViewHolder> implements Filterable {
    private Context context;
    private List<Course> courseList;
    private List<Course> courseListFull;

    public CourseSimpleRvAdapter(List<Course> courseList, List<Course> courseListFull) {
        this.courseList = courseList;
        this.courseListFull = courseListFull;
    }

    @Override
    public CourseSimpleRvAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        context = parent.getContext();
        View view = LayoutInflater.from(context).inflate(R.layout.row_course_simple, parent, false);
        final MyViewHolder myViewHolder = new MyViewHolder(view);
        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = myViewHolder.getAdapterPosition();
                Bundle bundle = new Bundle();
                bundle.putString("course_id", courseList.get(position).getId());
                ScoreManageSessionFragment fragment = new ScoreManageSessionFragment();
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
        Course course = courseList.get(position);
        ColorGenerator colorGenerator = ColorGenerator.MATERIAL;
        int color = colorGenerator.getColor(course.getId().charAt(0) + "");
        TextDrawable textDrawable = TextDrawable.builder()
                .buildRound(course.getId().charAt(0) + "", color);
        holder.letterImage.setImageDrawable(textDrawable);
        holder.nameTextView.setText(course.getId());
        holder.detailsTextView.setText(course.getName());
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
