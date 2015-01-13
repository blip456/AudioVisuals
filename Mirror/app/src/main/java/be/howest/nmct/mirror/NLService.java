package be.howest.nmct.mirror;


import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.service.notification.NotificationListenerService;
import android.service.notification.StatusBarNotification;
import android.util.Log;
import android.widget.Toast;

public class NLService extends NotificationListenerService {

    private String TAG = this.getClass().getSimpleName();
    private NLServiceReceiver nlservicereciver;
    @Override
    public void onCreate() {
        super.onCreate();
        nlservicereciver = new NLServiceReceiver();
        IntentFilter filter = new IntentFilter();
        filter.addAction("be.howest.nmct.mirror.NOTIFICATION_LISTENER_SERVICE_EXAMPLE");
        registerReceiver(nlservicereciver,filter);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        unregisterReceiver(nlservicereciver);
    }

    @Override
    public void onNotificationPosted(StatusBarNotification sbn) {

        Log.i(TAG,"**********  onNotificationPosted");
        Log.i(TAG,"ID :" + sbn.getId() + "\t" + sbn.getNotification().tickerText + "\t" + sbn.getPackageName());
        Intent i = new  Intent("be.howest.nmct.mirror.NOTIFICATION_LISTENER_EXAMPLE");
        i.putExtra("notification_event","onNotificationPosted :" + sbn.getPackageName() + "\n");
        sendBroadcast(i);

    }

    @Override
    public void onNotificationRemoved(StatusBarNotification sbn) {
        Log.i(TAG,"********** onNOtificationRemoved");
        Log.i(TAG,"ID :" + sbn.getId() + "\t" + sbn.getNotification().tickerText +"\t" + sbn.getPackageName());
        Intent i = new  Intent("be.howest.nmct.mirror.NOTIFICATION_LISTENER_EXAMPLE");
        i.putExtra("notification_event","onNotificationRemoved :" + sbn.getPackageName() + "\n");

        sendBroadcast(i);
    }

    class NLServiceReceiver extends BroadcastReceiver{

        @Override
        public void onReceive(Context context, Intent intent) {
            if(intent.getStringExtra("command").equals("clearall")){
                NLService.this.cancelAllNotifications();
            }
            else if(intent.getStringExtra("command").equals("list")){
                getNotifications();

            }

        }
    }

    public void getNotifications()
    {
        Intent i1 = new  Intent("be.howest.nmct.mirror.NOTIFICATION_LISTENER_EXAMPLE");
        i1.putExtra("notification_event","=====================");
        sendBroadcast(i1);
        int i=1;
        for (StatusBarNotification sbn : NLService.this.getActiveNotifications()) {
            Intent i2 = new  Intent("be.howest.nmct.mirror.NOTIFICATION_LISTENER_EXAMPLE");
            i2.putExtra("notification_event",i +" " + sbn.getPackageName() + "\n");
            sendBroadcast(i2);
            i++;
            Toast.makeText(getApplicationContext(), "Yoran: " + sbn.getNotification(), Toast.LENGTH_SHORT).show();
        }
        Intent i3 = new  Intent("be.howest.nmct.mirror.NOTIFICATION_LISTENER_EXAMPLE");
        i3.putExtra("notification_event","===== Notification List ====");
        sendBroadcast(i3);
    }

}

