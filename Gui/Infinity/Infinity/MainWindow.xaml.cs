using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Infinity
{       
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        // Strings
        String strSelectedPort = "";
        String strSelectedBaudRate = "";
        // Arrays
        string[] arrSerialPorts = null;
        // Objects
        SerialPort serialPort = new SerialPort();
        public MainWindow()
        {
            InitializeComponent();
            GetSerialPorts();
            SetBautRateCombobox();
        }

        #region GeneralMethods
        private void GetSerialPorts()
        { 
            arrSerialPorts = SerialPort.GetPortNames();
            cboPorts.ItemsSource = arrSerialPorts;
            cboPorts.Text = cboPorts.Items[0].ToString();
        }

        private void SetBautRateCombobox()
        {
            cboBaudRate.Items.Add(300);
            cboBaudRate.Items.Add(600);
            cboBaudRate.Items.Add(1200);
            cboBaudRate.Items.Add(2400);
            cboBaudRate.Items.Add(9600);
            cboBaudRate.Items.Add(14400);
            cboBaudRate.Items.Add(19200);
            cboBaudRate.Items.Add(38400);
            cboBaudRate.Items.Add(57600);
            cboBaudRate.Items.Add(115200);
            cboBaudRate.Items.ToString();
            // Show first item in combobox
            cboBaudRate.Text = cboBaudRate.Items[0].ToString();
        }

        private void OpenSerialPort()
        {
            if (!serialPort.IsOpen)
            {
                // Init connection
                serialPort.PortName = strSelectedPort;
                serialPort.BaudRate = Convert.ToInt32(strSelectedBaudRate);
                serialPort.DataBits = 8;
                serialPort.Parity = Parity.None;
                serialPort.Handshake = Handshake.None;

                // Open connection
                serialPort.Open();
            }
        }

        private void CloseSerialPort()
        {
            if (serialPort.IsOpen)
                serialPort.Close();
        }
        #endregion

        #region Event methods
        private void UseSerialPort()
        {
            strSelectedPort = (String)cboPorts.SelectedItem;
            //strSelectedBaudRate = (String)cboBaudRate.SelectedItem;
            strSelectedBaudRate = "9600";
            
            OpenSerialPort();           
        }
        #endregion

        #region Event
        private void btnUsePort_Click(object sender, RoutedEventArgs e)
        {
            UseSerialPort();
        }
        #endregion

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            if (serialPort.IsOpen)
            {
                serialPort.Write(txtTestContent.Text);
            }
        }
    }
}
