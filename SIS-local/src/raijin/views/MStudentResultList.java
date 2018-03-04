package raijin.views;

import raijin.controllers.ControllerInterface;
import raijin.models.AnnualStudent;
import raijin.models.Course;
import raijin.models.Student;
import raijin.models.StudentResult;
import raijin.utils.DataManager;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.*;
import java.util.Vector;

public class MStudentResultList extends JDialog {
    private JPanel contentPane;
    private JPanel tableResult;
    private JPanel tableCourse;
    private JButton getResultButton;
    private JTable dataTable;
    private JTable dataTable1;
    public static DefaultTableModel tmd;
    public static DefaultTableModel tmd1;
    private ControllerInterface c1;

    public MStudentResultList(ControllerInterface controller) {
        c1 = controller;
        setContentPane(contentPane);
        setModal(true);

        createUIComponents();
        tableCourse.setLayout(new BorderLayout());
        tableCourse.add(new JScrollPane(dataTable));
        tableResult.setLayout(new BorderLayout());
        tableResult.add(new JScrollPane(dataTable1));

        getResultButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                onGetResult();
            }
        });
        // call onCancel() when cross is clicked
        setDefaultCloseOperation(DO_NOTHING_ON_CLOSE);
        addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                onCancel();
            }
        });

        // call onCancel() on ESCAPE
        contentPane.registerKeyboardAction(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                onCancel();
            }
        }, KeyStroke.getKeyStroke(KeyEvent.VK_ESCAPE, 0), JComponent.WHEN_ANCESTOR_OF_FOCUSED_COMPONENT);
    }

    private void onOK() {
        // add your code here
        dispose();
    }

    private void onCancel() {
        // add your code here if necessary
        dispose();
    }

    private void onGetResult() {

        // for .... tmd.addRow();
        int cur_row = dataTable.getSelectedRow();
        if (cur_row == -1) {
            return;
        }
        tmd1.setRowCount(0);
        Course cur_course = DataManager.getInst().findCourseByID(tmd.getValueAt(dataTable.getSelectedRow(), 0).toString());
        for (StudentResult result : c1.getStudentResultList(cur_course)) {
            tmd1.addRow(new Object[]{result.getStudentID(), result.getStudentName(), result.getMidtermPoint() < 0 ? "N/A" : result.getMidtermPoint(), result.getFinalPoint() < 0 ? "N/A" : result.getFinalPoint(), result.getPoint() < 0 ? "N/A" : result.getPoint()});
        }
        tmd1.fireTableDataChanged();
        dataTable1 = new JTable(tmd1);
    }

    private void createUIComponents() {
        // TODO: place custom component creation code here
        Vector<String> colNames = new Vector<>();
        colNames.add("ID");
        colNames.add("Name");

        tmd = new DefaultTableModel(colNames, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                //all cells false
                return false;
            }
        };
        // for .... tmd.addRow();
        for (Course course : DataManager.getInst().getCourseList()) {

            tmd.addRow(new Object[]{course.getId(), course.getName()});

        }

        tmd.fireTableDataChanged();
        dataTable = new JTable(tmd);

        //table Result
        Vector<String> colNames1 = new Vector<>();
        colNames1.add("ID");
        colNames1.add("Name");
        colNames1.add("Midterm");
        colNames1.add("Final");
        colNames1.add("Score");


        tmd1 = new DefaultTableModel(colNames1, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                //all cells false
                return false;
            }
        };
        tmd1.fireTableDataChanged();
        dataTable1 = new JTable(tmd1);

    }

    {
// GUI initializer generated by IntelliJ IDEA GUI Designer
// >>> IMPORTANT!! <<<
// DO NOT EDIT OR ADD ANY CODE HERE!
        $$$setupUI$$$();
    }

    /**
     * Method generated by IntelliJ IDEA GUI Designer
     * >>> IMPORTANT!! <<<
     * DO NOT edit this method OR call it in your code!
     *
     * @noinspection ALL
     */
    private void $$$setupUI$$$() {
        contentPane = new JPanel();
        contentPane.setLayout(new com.intellij.uiDesigner.core.GridLayoutManager(4, 1, new Insets(10, 10, 10, 10), -1, -1));
        tableResult = new JPanel();
        tableResult.setLayout(new com.intellij.uiDesigner.core.GridLayoutManager(1, 1, new Insets(0, 0, 0, 0), -1, -1));
        contentPane.add(tableResult, new com.intellij.uiDesigner.core.GridConstraints(3, 0, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_BOTH, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, null, null, null, 0, false));
        final JLabel label1 = new JLabel();
        label1.setText("Student Result List");
        contentPane.add(label1, new com.intellij.uiDesigner.core.GridConstraints(0, 0, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_NONE, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        tableCourse = new JPanel();
        tableCourse.setLayout(new com.intellij.uiDesigner.core.GridLayoutManager(1, 1, new Insets(0, 0, 0, 0), -1, -1));
        contentPane.add(tableCourse, new com.intellij.uiDesigner.core.GridConstraints(1, 0, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_BOTH, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, null, null, null, 0, false));
        getResultButton = new JButton();
        getResultButton.setText("Get Result");
        contentPane.add(getResultButton, new com.intellij.uiDesigner.core.GridConstraints(2, 0, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_HORIZONTAL, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
    }

    /**
     * @noinspection ALL
     */
    public JComponent $$$getRootComponent$$$() {
        return contentPane;
    }
}
