package be.howest.nmct.android;

import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v4.app.NotificationCompat;
import android.support.v7.app.ActionBarActivity;
import android.view.MotionEvent;
import android.view.View;
import android.widget.CompoundButton;
import android.widget.Switch;


public class MainActivity extends ActionBarActivity {

    private NotificationReceiver nReceiver;
    SharedPreferences.Editor editor;
    public SharedPreferences sharedpreferences;

    private static boolean isTwitter;
    private static boolean isFacebook;
    private static boolean isInstagram;
    private static boolean isGmail;
    private static boolean isSMS;
    private static boolean isCall;
    private static boolean isPushbullet;

    public static final String MyPREFERENCES = "MyPrefs" ;
    public static final String Twitter = "isTwitter";
    public static final String Facebook = "isFacebook";
    public static final String Instagram = "isInstagram";
    public static final String Gmail = "isGmail";
    public static final String SMS = "isSMS";
    public static final String Call = "isCall";
    public static final String Pushbullet = "isPushbullet";

    Switch swhTwitter;
    Switch swhFacebook;
    Switch swhInstagram;
    Switch swhGmail;
    Switch swhSMS;
    Switch swhCall;
    Switch swhPushbullet;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        sharedpreferences = getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE);
        nReceiver = new NotificationReceiver();
        IntentFilter filter = new IntentFilter();
        filter.addAction("be.howest.nmct.android.NOTIFICATION_LISTENER_EXAMPLE");
        registerReceiver(nReceiver,filter);

        swhTwitter = (Switch)findViewById(R.id.twitterToggle);
        swhFacebook = (Switch)findViewById(R.id.facebookToggle);
        swhInstagram = (Switch)findViewById(R.id.instagramToggle);
        swhGmail = (Switch)findViewById(R.id.gmailToggle);
        swhSMS = (Switch)findViewById(R.id.smsToggle);
        swhCall = (Switch)findViewById(R.id.callToggle);
        swhPushbullet = (Switch)findViewById(R.id.pushToggle);


        if (sharedpreferences.contains(Twitter))
        {
            isTwitter = sharedpreferences.getBoolean(Twitter, true);
        }
        if (sharedpreferences.contains(Facebook))
        {
            isFacebook = sharedpreferences.getBoolean(Facebook, true);
        }
        if (sharedpreferences.contains(Instagram))
        {
            isInstagram = sharedpreferences.getBoolean(Instagram, true);
        }
        if (sharedpreferences.contains(Gmail))
        {
            isGmail = sharedpreferences.getBoolean(Gmail, true);
        }

        swhTwitter.setChecked(isTwitter);
        swhFacebook.setChecked(isFacebook);
        swhInstagram.setChecked(isInstagram);
        swhGmail.setChecked(isGmail);
        swhTwitter.setChecked(isTwitter);
        swhTwitter.setChecked(isTwitter);
        swhTwitter.setChecked(isTwitter);
        swhTwitter.setChecked(isTwitter);

        swhTwitter.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                editPrefs(Twitter, swhTwitter.isChecked());
            }
        });
        swhFacebook.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                editPrefs(Facebook, swhFacebook.isChecked());
            }
        });
        swhInstagram.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                editPrefs(Instagram, swhInstagram.isChecked());
            }
        });
        swhGmail.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                editPrefs(Gmail, swhGmail.isChecked());
            }
        });
        swhSMS.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                editPrefs(SMS, swhSMS.isChecked());
            }
        });
        swhCall.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                editPrefs(Call, swhCall.isChecked());
            }
        });
        swhPushbullet.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                editPrefs(Pushbullet, swhPushbullet.isChecked());
            }
        });
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
        unregisterReceiver(nReceiver);
    }

    public void buttonClicked(View v){

        if(v.getId() == R.id.btnCreateNotify){
            NotificationManager nManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
            NotificationCompat.Builder ncomp = new NotificationCompat.Builder(this);
            ncomp.setContentTitle("Mirror");
            ncomp.setContentText("The grid should light up");
            ncomp.setTicker("The grid should light up");
            ncomp.setSmallIcon(R.drawable.notification_icon);
            ncomp.setAutoCancel(true);
            nManager.notify((int)System.currentTimeMillis(),ncomp.build());
        }
    }

    public void editPrefs(String key, Boolean value)
    {
        editor = sharedpreferences.edit();
        editor.putBoolean(key, value);
        editor.commit();
    }
    class NotificationReceiver extends BroadcastReceiver{

        @Override
        public void onReceive(Context context, Intent intent) {
        }
    }
}