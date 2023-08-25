package raijin.librarymanagementsystem.boundaries.activities;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;

import raijin.librarymanagementsystem.R;
import raijin.librarymanagementsystem.boundaries.fragments.BlankFragment;
import raijin.librarymanagementsystem.boundaries.fragments.BorrowBookFragment;
import raijin.librarymanagementsystem.utils.Utils;

public class BorrowerActivity extends BaseDrawerActivity
        implements NavigationView.OnNavigationItemSelectedListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_borrower);
        init();
    }

    private void init() {
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        drawer = findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();

        navigationView = findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);
        navigationView.getMenu().performIdentifierAction(R.id.nav_book, 0);
        navigationView.setCheckedItem(R.id.nav_book);
        loginPref = getSharedPreferences("login", MODE_PRIVATE);
    }


    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.nav_book:
                openFragment(new BorrowBookFragment());
                break;
            case R.id.nav_account_settings:
                openFragment(new BlankFragment());
                break;
            case R.id.nav_logout:
                loginPref.edit().putString("username", null)
                        .putString("password", null)
                        .apply();
                Utils.username = null;
                startActivity(new Intent(this, LoginActivity.class));
                finish();
                break;
            default:
                break;
        }

        DrawerLayout drawer = findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }
}
