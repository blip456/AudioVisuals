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

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

import java.net.URI;

public class NLService extends NotificationListenerService {

    private String TAG = this.getClass().getSimpleName();
    private NLServiceReceiver nlservicereciver;
    private String baseAPIurl = "http://172.23.49.0:3000/";


    @Override
    public void onCreate() {
        super.onCreate();
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
            new RetrieveFeedTask().execute(baseAPIurl + "twitter");
            AddNotificationToArray(sbn);
            Log.i(TAG,"**********  onNotificationPosted");
            Log.i(TAG,"ID :" + sbn.getId() + "t" + sbn.getNotification().tickerText + "\t" + sbn.getPackageName());
        }
        if(sbn.getPackageName().equals("com.facebook.katana") && MainActivity.isFacebook)
        {
            new RetrieveFeedTask().execute(baseAPIurl + "facebook");
            AddNotificationToArray(sbn);
            Log.i(TAG,"**********  onNotificationPosted");
            Log.i(TAG,"ID :" + sbn.getId() + "t" + sbn.getNotification().tickerText + "\t" + sbn.getPackageName());
        }
        if(sbn.getPackageName().equals("com.facebook.orca") && MainActivity.isFacebook)
        {
            new RetrieveFeedTask().execute(baseAPIurl + "messenger");
            AddNotificationToArray(sbn);
            Log.i(TAG,"**********  onNotificationPosted");
            Log.i(TAG,"ID :" + sbn.getId() + "t" + sbn.getNotification().tickerText + "\t" + sbn.getPackageName());
        }
        if(sbn.getPackageName().equals("com.instagram.android") && MainActivity.isInstagram)
        {
            new RetrieveFeedTask().execute(baseAPIurl + "instagram");
            AddNotificationToArray(sbn);
            Log.i(TAG,"**********  onNotificationPosted");
            Log.i(TAG,"ID :" + sbn.getId() + "t" + sbn.getNotification().tickerText + "\t" + sbn.getPackageName());
        }
        if(sbn.getPackageName().equals("com.google.android.gm") && MainActivity.isGmail)
        {
            new RetrieveFeedTask().execute(baseAPIurl + "gmail");
            AddNotificationToArray(sbn);
            Log.i(TAG,"**********  onNotificationPosted");
            Log.i(TAG,"ID :" + sbn.getId() + "t" + sbn.getNotification().tickerText + "\t" + sbn.getPackageName());
        }
        if(sbn.getPackageName().equals("com.textra") && MainActivity.isSMS)
        {
            new RetrieveFeedTask().execute(baseAPIurl + "sms");
            AddNotificationToArray(sbn);
            Log.i(TAG,"**********  onNotificationPosted");
            Log.i(TAG,"ID :" + sbn.getId() + "t" + sbn.getNotification().tickerText + "\t" + sbn.getPackageName());
        }
        if(sbn.getPackageName().equals("com.google.android.dialer") || sbn.getPackageName().equals("com.android.server.telecom") && MainActivity.isCall)
        {
            new RetrieveFeedTask().execute(baseAPIurl + "call");
            AddNotificationToArray(sbn);
            Log.i(TAG,"**********  onNotificationPosted");
            Log.i(TAG,"ID :" + sbn.getId() + "t" + sbn.getNotification().tickerText + "\t" + sbn.getPackageName());
        }
        if(sbn.getPackageName().equals("com.pushbullet.android") && MainActivity.isPushbullet)
        {
            new RetrieveFeedTask().execute(baseAPIurl + "pushbullet");
            AddNotificationToArray(sbn);
            Log.i(TAG,"**********  onNotificationPosted");
            Log.i("Er is een notificatie", "Packagename:" + sbn.getPackageName());
        }
        if(sbn.getPackageName().equals("be.howest.nmct.android"))
        {
            AddNotificationToArray(sbn);
            new RetrieveFeedTask().execute(baseAPIurl + "test");
            Log.i("Er is een notificatie", "Packagename:" + sbn.getPackageName());
        }
        Log.i("Er is een notificatie", "Algemene notificatie: Packagename:" + sbn.getPackageName());
    }

    @Override
    public void onNotificationRemoved(StatusBarNotification sbn) {
        new RetrieveFeedTask().execute(baseAPIurl + "clear");
        Log.i("Er is een notificatie", "Maar je hebt ze verwijderd: Packagename:" + sbn.getPackageName());
    }

    public void AddNotificationToArray(StatusBarNotification sbn)
    {
        MainActivity.arrImportantNotifications.add(sbn);
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

    class RetrieveFeedTask extends AsyncTask<String, Void, String> {

        private Exception exception;

        protected String doInBackground(String... urls) {
            try {
                HttpClient client = new DefaultHttpClient();
                HttpGet request = new HttpGet();
                URI test = new URI(urls[0]);
                Log.v("URL: ", "de url is: " + urls[0]);
                request.setURI(test);
                HttpResponse response = client.execute(request);
            } catch (Exception e) {
                this.exception = e;
                exception.printStackTrace();
            }

            return "";
        }
    }

}