package be.howest.nmct.android;

import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.service.notification.StatusBarNotification;
import android.support.v4.app.NotificationCompat;
import android.support.v7.app.ActionBarActivity;
import android.view.MotionEvent;
import android.view.View;
import android.widget.CompoundButton;
import android.widget.Switch;
import android.widget.ToggleButton;

import java.util.ArrayList;
import java.util.List;


public class MainActivity extends ActionBarActivity {

    private NotificationReceiver nReceiver;
    SharedPreferences.Editor editor;
    public SharedPreferences sharedpreferences;
    ToggleButton tglVibrate;


    public static boolean isTwitter;
    public static boolean isFacebook;
    public static boolean isInstagram;
    public static boolean isGmail;
    public static boolean isSMS;
    public static boolean isCall;
    public static boolean isPushbullet;
    public static boolean isMessenger;
    public static boolean isVibrate;


    public static final String MyPREFERENCES = "MyPrefs" ;
    public static final String Twitter = "isTwitter";
    public static final String Facebook = "isFacebook";
    public static final String Instagram = "isInstagram";
    public static final String Gmail = "isGmail";
    public static final String SMS = "isSMS";
    public static final String Call = "isCall";
    public static final String Pushbullet = "isPushbullet";
    public static final String Messenger = "isMessenger";
    public static final String Vibrate = "isVibrate";

    Switch swhTwitter;
    Switch swhFacebook;
    Switch swhInstagram;
    Switch swhGmail;
    Switch swhSMS;
    Switch swhCall;
    Switch swhPushbullet;
    Switch swhMessenger;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        sharedpreferences = getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE);
        nReceiver = new NotificationReceiver();
        IntentFilter filter = new IntentFilter();
        filter.addAction("be.howest.nmct.android.NOTIFICATION_LISTENER_EXAMPLE");
        registerReceiver(nReceiver,filter);

        tglVibrate = (ToggleButton)findViewById(R.id.toggleVibrate);

        swhTwitter = (Switch)findViewById(R.id.twitterToggle);
        swhFacebook = (Switch)findViewById(R.id.facebookToggle);
        swhInstagram = (Switch)findViewById(R.id.instagramToggle);
        swhGmail = (Switch)findViewById(R.id.gmailToggle);
        swhSMS = (Switch)findViewById(R.id.smsToggle);
        swhCall = (Switch)findViewById(R.id.callToggle);
        swhPushbullet = (Switch)findViewById(R.id.pushToggle);
        swhMessenger = (Switch)findViewById(R.id.messengerToggle);


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
        if (sharedpreferences.contains(SMS))
        {
            isSMS = sharedpreferences.getBoolean(SMS, true);
        }
        if (sharedpreferences.contains(Call))
        {
            isCall = sharedpreferences.getBoolean(Call, true);
        }
        if (sharedpreferences.contains(Pushbullet))
        {
            isPushbullet = sharedpreferences.getBoolean(Pushbullet, true);
        }
        if (sharedpreferences.contains(Messenger))
        {
            isMessenger = sharedpreferences.getBoolean(Messenger, true);
        }
        if (sharedpreferences.contains(Vibrate))
        {
            isVibrate = sharedpreferences.getBoolean(Vibrate, true);
        }

        swhTwitter.setChecked(isTwitter);
        swhFacebook.setChecked(isFacebook);
        swhInstagram.setChecked(isInstagram);
        swhGmail.setChecked(isGmail);
        swhSMS.setChecked(isSMS);
        swhCall.setChecked(isCall);
        swhPushbullet.setChecked(isPushbullet);
        swhMessenger.setChecked(isMessenger);

        tglVibrate.setChecked(isVibrate);

        tglVibrate.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                editPrefs(Vibrate, tglVibrate.isChecked());
                isVibrate = !isVibrate;
            }
        });

        swhTwitter.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                editPrefs(Twitter, swhTwitter.isChecked());
                isTwitter = !isTwitter;
            }
        });
        swhFacebook.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                editPrefs(Facebook, swhFacebook.isChecked());
                isFacebook = !isFacebook;
            }
        });
        swhInstagram.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                editPrefs(Instagram, swhInstagram.isChecked());
                isInstagram = !isInstagram;
            }
        });
        swhGmail.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                editPrefs(Gmail, swhGmail.isChecked());
                isGmail = !isGmail;
            }
        });
        swhSMS.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                editPrefs(SMS, swhSMS.isChecked());
                isSMS = !isSMS;
            }
        });
        swhCall.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                editPrefs(Call, swhCall.isChecked());
                isCall = !isCall;
            }
        });
        swhPushbullet.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                editPrefs(Pushbullet, swhPushbullet.isChecked());
                isPushbullet = !isPushbullet;
            }
        });
        swhMessenger.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                editPrefs(Messenger, swhMessenger.isChecked());
                isMessenger = !isMessenger;
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
            ncomp.setContentTitle(getString(R.string.app_name));
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