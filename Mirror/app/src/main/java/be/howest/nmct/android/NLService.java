package be.howest.nmct.android;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.AsyncTask;
import android.service.notification.NotificationListenerService;
import android.service.notification.StatusBarNotification;
import android.util.Log;
import android.view.View;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;
import java.util.logging.Handler;

public class NLService extends NotificationListenerService {

    private String TAG = this.getClass().getSimpleName();
    private NLServiceReceiver nlservicereciver;
    private String baseAPIurl = "http://192.168.0.197:3000/";


    public  List<String> arrImportantNotifications;

    @Override
    public void onCreate() {
        super.onCreate();
        arrImportantNotifications = new ArrayList<>();
        nlservicereciver = new NLServiceReceiver();
        IntentFilter filter = new IntentFilter();
        filter.addAction("be.howest.nmct.android.NOTIFICATION_LISTENER_SERVICE_EXAMPLE");
        registerReceiver(nlservicereciver,filter);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        unregisterReceiver(nlservicereciver);
    }

    @Override
    public void onNotificationPosted(StatusBarNotification sbn) {

        if(sbn.getPackageName().equals("com.twitter.android") && MainActivity.isTwitter)
        {
            new APIGetTask().execute(baseAPIurl + "twitter?packagename=" + sbn.getPackageName());
            AddNotificationToArray(sbn);
            Log.i(TAG,"**********  onNotificationPosted");
            Log.i(TAG,"ID :" + sbn.getId() + "t" + sbn.getNotification().tickerText + "\t" + sbn.getPackageName());
        }
        if(sbn.getPackageName().equals("com.facebook.katana") && MainActivity.isFacebook)
        {
            new APIGetTask().execute(baseAPIurl + "facebook?packagename="+ sbn.getPackageName());
            AddNotificationToArray(sbn);
            Log.i(TAG,"**********  onNotificationPosted");
            Log.i(TAG,"ID :" + sbn.getId() + "t" + sbn.getNotification().tickerText + "\t" + sbn.getPackageName());
        }
        if(sbn.getPackageName().equals("com.facebook.orca") && MainActivity.isMessenger)
        {
            new APIGetTask().execute(baseAPIurl + "messenger?packagename="+ sbn.getPackageName());
            AddNotificationToArray(sbn);
            Log.i(TAG,"**********  onNotificationPosted");
            Log.i(TAG,"ID :" + sbn.getId() + "t" + sbn.getNotification().tickerText + "\t" + sbn.getPackageName());
        }
        if(sbn.getPackageName().equals("com.instagram.android") && MainActivity.isInstagram)
        {
            new APIGetTask().execute(baseAPIurl + "instagram?packagename="+ sbn.getPackageName());
            AddNotificationToArray(sbn);
            Log.i(TAG,"**********  onNotificationPosted");
            Log.i(TAG,"ID :" + sbn.getId() + "t" + sbn.getNotification().tickerText + "\t" + sbn.getPackageName());
        }
        if(sbn.getPackageName().equals("com.google.android.gm") && MainActivity.isGmail)
        {
            new APIGetTask().execute(baseAPIurl + "gmail?packagename="+ sbn.getPackageName());
            AddNotificationToArray(sbn);
            Log.i(TAG,"**********  onNotificationPosted");
            Log.i(TAG,"ID :" + sbn.getId() + "t" + sbn.getNotification().tickerText + "\t" + sbn.getPackageName());
        }
        if(sbn.getPackageName().equals("com.textra") || sbn.getPackageName().equals("com.google.android.apps.messaging") && MainActivity.isSMS)
        {
            new APIGetTask().execute(baseAPIurl + "sms?packagename="+ sbn.getPackageName());
            AddNotificationToArray(sbn);
            Log.i(TAG,"**********  onNotificationPosted");
            Log.i(TAG,"ID :" + sbn.getId() + "t" + sbn.getNotification().tickerText + "\t" + sbn.getPackageName());
        }
        if(sbn.getPackageName().equals("com.google.android.dialer") || sbn.getPackageName().equals("com.android.server.telecom") && MainActivity.isCall)
        {
            new APIGetTask().execute(baseAPIurl + "call?packagename="+ sbn.getPackageName());
            AddNotificationToArray(sbn);
            Log.i(TAG,"**********  onNotificationPosted");
            Log.i(TAG,"ID :" + sbn.getId() + "t" + sbn.getNotification().tickerText + "\t" + sbn.getPackageName());
        }
        if(sbn.getPackageName().equals("com.pushbullet.android") && MainActivity.isPushbullet)
        {
            new APIGetTask().execute(baseAPIurl + "pushbullet?packagename="+ sbn.getPackageName());
            AddNotificationToArray(sbn);
            Log.i(TAG,"**********  onNotificationPosted");
            Log.i("Er is een notificatie", "Packagename:" + sbn.getPackageName());
        }
        if(sbn.getPackageName().equals("be.howest.nmct.android"))
        {
            AddNotificationToArray(sbn);
            new APIGetTask().execute(baseAPIurl + "test?packagename="+ sbn.getPackageName());
            Log.i("Er is een notificatie", "Packagename:" + sbn.getPackageName());
        }
        Log.i("Er is een notificatie", "Algemene notificatie: Packagename:" + sbn.getPackageName());
    }

    @Override
    public void onNotificationRemoved(StatusBarNotification sbn) {
        new APIGetTask().execute(baseAPIurl + "clear?packagename="+sbn.getPackageName());
    }

    public void AddNotificationToArray(StatusBarNotification sbn)
    {
        arrImportantNotifications.add(sbn.getPackageName());
    }

    class NLServiceReceiver extends BroadcastReceiver{

        @Override
        public void onReceive(Context context, Intent intent) {

             if(intent.getStringExtra("command").equals("list")){
                Intent i1 = new  Intent("be.howest.nmct.android.NOTIFICATION_LISTENER_EXAMPLE");
                i1.putExtra("notification_event","=====================");
                sendBroadcast(i1);
                int i=1;
                for (StatusBarNotification sbn : NLService.this.getActiveNotifications()) {
                    Intent i2 = new  Intent("be.howest.nmct.android.NOTIFICATION_LISTENER_EXAMPLE");
                    i2.putExtra("notification_event",i +" " + sbn.getPackageName());
                    sendBroadcast(i2);
                    i++;
                }
                Intent i3 = new  Intent("be.howest.nmct.android.NOTIFICATION_LISTENER_EXAMPLE");
                i3.putExtra("notification_event","===== Notification List ====");
                sendBroadcast(i3);

            }
        }
    }

    class APIGetTask extends AsyncTask<String, Void, String> {

        private Exception exception;

        protected String doInBackground(String... urls) {
            try {
                HttpClient client = new DefaultHttpClient();
                HttpGet request = new HttpGet();
                URI uri = new URI(urls[0]+"&vibrate="+MainActivity.isVibrate);
                request.setURI(uri);
                HttpResponse response = client.execute(request);
                Log.i("API: ", "Response of get is: " + response);
            } catch (Exception e) {
                this.exception = e;
                exception.printStackTrace();
            }

            return "";
        }
    }
}