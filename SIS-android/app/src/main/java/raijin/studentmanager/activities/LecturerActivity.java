package raijin.studentmanager.activities;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.design.widget.NavigationView;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.view.menu.MenuItemImpl;
import android.support.v7.widget.SearchView;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.AutoCompleteTextView;
import android.widget.ImageView;
import android.widget.TextView;

import com.amulyakhare.textdrawable.TextDrawable;

import java.lang.reflect.Field;

import raijin.studentmanager.Constants;
import raijin.studentmanager.R;
import raijin.studentmanager.Utils;
import raijin.studentmanager.fragments.AccountSettingsFragment;
import raijin.studentmanager.fragments.CourseManageFragment;
import raijin.studentmanager.fragments.NotificationManageFragment;
import raijin.studentmanager.fragments.ScoreManageCourseFragment;
import raijin.studentmanager.fragments.ScoreManageSessionFragment;
import raijin.studentmanager.fragments.StudentManageFragment;
import raijin.studentmanager.fragments.TimetableFragment;
import raijin.studentmanager.interfaces.Searchable;
import raijin.studentmanager.interfaces.UserInfoListener;
import raijin.studentmanager.models.userinfo.UserInfo;
import raijin.studentmanager.webservices.ServiceFactory;
import raijin.studentmanager.webservices.UserAPI;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LecturerActivity extends AppCompatActivity implements UserInfoListener, NavigationView.OnNavigationItemSelectedListener {

    private SharedPreferences loginPref;
    private NavigationView navigationView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lecturer);
        init();
    }

    private void init() {
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();

        navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);
        navigationView.getMenu().performIdentifierAction(R.id.nav_score, 0);
        navigationView.setCheckedItem(R.id.nav_score);
        onInfoChanged();

        loginPref = getSharedPreferences("login", MODE_PRIVATE);
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main, menu);
        MenuItemImpl menuItem = (MenuItemImpl) menu.findItem(R.id.action_search);
        SearchView searchView = (SearchView) menuItem.getActionView();
        final AutoCompleteTextView searchTextView = (AutoCompleteTextView) searchView.findViewById(R.id.search_src_text);
        try {
            Field mCursorDrawableRes = TextView.class.getDeclaredField("mCursorDrawableRes");
            mCursorDrawableRes.setAccessible(true);
            mCursorDrawableRes.set(searchTextView, R.drawable.cursor);
        } catch (Exception e) {
        }
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                doSearch(query);
                return true;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                doSearch(newText);
                return true;
            }
        });
        return true;
    }

    private void doSearch(String searchString) {
        Fragment fragment = getSupportFragmentManager().findFragmentById(R.id.container);
        Searchable searchableFragment = null;
        if (fragment instanceof Searchable)
            searchableFragment = (Searchable) fragment;
        if (searchableFragment != null) {
            searchableFragment.doSearch(searchString);
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        int id = item.getItemId();
        switch (id) {
            case R.id.nav_signout:
                loginPref.edit().putString("username", null)
                        .putString("password", null)
                        .apply();
                Utils.AUTHORIZATION_TOKEN = null;
                startActivity(new Intent(this, LoginActivity.class));
                finish();
                break;
            case R.id.nav_account_settings:
                openFragment(new AccountSettingsFragment());
                break;
            case R.id.nav_score:
                openFragment(new ScoreManageSessionFragment());
                break;
            case R.id.nav_noti:
                openFragment(new NotificationManageFragment());
                break;
            case R.id.nav_timetable:
                openFragment(new TimetableFragment());
                break;
            default:
                break;
        }
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    private void openFragment(Fragment fragment) {
        getSupportFragmentManager().popBackStack(null, FragmentManager.POP_BACK_STACK_INCLUSIVE);
        getSupportFragmentManager().beginTransaction().replace(R.id.container, fragment).commit();
    }

    @Override
    public void onInfoChanged() {
        final TextView nameTextView = (TextView) navigationView.getHeaderView(0).findViewById(R.id.tv_name);
        final TextView emailTextView = (TextView) navigationView.getHeaderView(0).findViewById(R.id.tv_email);
        final ImageView avatar = (ImageView) navigationView.getHeaderView(0).findViewById(R.id.avatar);
        ServiceFactory.getInst().createService(UserAPI.class).callUserInfo(Constants.JSON_FORMAT)
                .enqueue(new Callback<UserInfo>() {
                    @Override
                    public void onResponse(Call<UserInfo> call, Response<UserInfo> response) {
                        if (response.isSuccessful()) {
                            UserInfo userInfo = response.body();
                            if (userInfo.getFirstName().equals("")) {
                                nameTextView.setText(userInfo.getUsername());
                                avatar.setImageResource(R.drawable.logo_bk);
                            } else {
                                nameTextView.setText(userInfo.getFirstName() + " " + userInfo.getLastName());
                                TextDrawable textDrawable = TextDrawable.builder()
                                        .beginConfig().height(150).width(150).endConfig()
                                        .buildRect(userInfo.getFirstName().charAt(0) + "", getResources().getColor(R.color.colorUltraDark));
                                avatar.setImageDrawable(textDrawable);
                            }
                            if (!userInfo.getEmail().equals("")) {
                                emailTextView.setText(userInfo.getEmail());
                            } else {
                                emailTextView.setText(userInfo.getUsername() + "@hust.edu.vn");
                            }

                        }
                    }

                    @Override
                    public void onFailure(Call<UserInfo> call, Throwable t) {

                    }
                });
    }
}
