package raijin.views;

import raijin.controllers.Controller;
import raijin.controllers.ControllerInterface;
import raijin.models.Student;
import raijin.utils.DataManager;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import javax.xml.crypto.Data;
import java.awt.*;
import java.awt.event.*;
import java.util.Calendar;
import java.util.Vector;

public class MStudentList extends JDialog {
    private JPanel contentPane;
    private JButton addButton;
    private JButton editButton;
    private JButton removeButton;
    private JButton addToClassButton;
    private JButton updateResultButton;
    private JPanel menuPanel;
    private JLabel StudentListLabel;
    private JPanel tablePanel;
    private JTable dataTable;
    public static DefaultTableModel tmd;
    private JMenuBar menuBar;
    private JMenu jmenu;
    private JMenuItem course, manager, sresult, aclass, logout;
    private ControllerInterface c1;


    public MStudentList(ControllerInterface controller) {
        c1 = controller;
        $$$setupUI$$$();
        setContentPane(contentPane);
        setModal(true);

        createUIComponents();
        menuPanel.setLayout(new BorderLayout());
        menuPanel.add(menuBar, BorderLayout.NORTH);
        menuBar.add(jmenu);
        tablePanel.setLayout(new BorderLayout());
        tablePanel.add(new JScrollPane(dataTable));


        addButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                onAddClick();
            }
        });

        editButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                onEditButtonClick();
            }
        });

        removeButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                onRemoveClick();
            }
        });

        addToClassButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                onAddToClassClick();
            }
        });

        updateResultButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                onUpdateResultButtonClick();
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

    private void onAddClick() {
        MAddStudent view = new MAddStudent();
        view.pack();
        view.setLocationRelativeTo(null);
        view.setVisible(true);
    }

    private void onEditButtonClick() {
        int cur_row = dataTable.getSelectedRow();
        if (cur_row == -1) {
            return;
        }
        Student tmp = DataManager.getInst().findStudentByID(tmd.getValueAt(dataTable.getSelectedRow(), 0).toString());
        String id = tmp.getId();
        MEditStudentInfoForm view = new MEditStudentInfoForm(id, c1);
        view.pack();
        view.setLocationRelativeTo(null);
        view.setVisible(true);
    }

    private void onRemoveClick() {
        int cur_row = dataTable.getSelectedRow();
        if (cur_row == -1) {
            return;
        }
        Student student = DataManager.getInst().findStudentByID(tmd.getValueAt(dataTable.getSelectedRow(), 0).toString());
        DataManager.getInst().removeStudent(student);
        tmd.removeRow(cur_row);
        tmd.fireTableDataChanged();

    }

    private void onAddToClassClick() {
        MAddToClass view = new MAddToClass(c1);
        view.pack();
        view.setLocationRelativeTo(null);
        view.setVisible(true);
    }

    private void onUpdateResultButtonClick() {
        MUpdateResult view = new MUpdateResult(c1);
        view.pack();
        view.setLocationRelativeTo(null);
        view.setVisible(true);
    }


    private void onCourseClick() {
        MCourseList view = new MCourseList();
        view.pack();
        view.setLocationRelativeTo(null);
        view.setVisible(true);
    }

    private void onManagerClick() {
        MManagerList view = new MManagerList();
        view.pack();
        view.setLocationRelativeTo(null);
        view.setVisible(true);
    }

    private void onSResultClick() {
        MStudentResultList view = new MStudentResultList(c1);
        view.pack();
        view.setLocationRelativeTo(null);
        view.setVisible(true);
    }

    private void onClassClick() {
        MClassList view = new MClassList(c1);
        view.pack();
        view.setLocationRelativeTo(null);
        view.setVisible(true);
    }


    private void onCancel() {
        // add your code here if necessary
        dispose();
    }


    private void createUIComponents() {

        menuBar = new JMenuBar();
        menuBar.setVisible(true);
        jmenu = new JMenu("Menu");
        course = new JMenuItem("Course List");
        manager = new JMenuItem("Manager List");
        sresult = new JMenuItem("Student Result");
        aclass = new JMenuItem("Class List");
        logout = new JMenuItem("Log Out");

        jmenu.add(course);
        jmenu.add(manager);
        jmenu.add(sresult);
        jmenu.add(aclass);
        jmenu.add(logout);


        course.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                onCourseClick();
            }
        });

        manager.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                onManagerClick();
            }
        });

        sresult.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                onSResultClick();
            }
        });

        aclass.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                onClassClick();
            }
        });

        logout.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                c1.logOut();
                dispose();
                LoginView lview = new LoginView(c1);
                lview.pack();
                lview.setLocationRelativeTo(null);
                lview.setVisible(true);
            }
        });


        Vector<String> colNames = new Vector<>();
        colNames.add("ID");
        colNames.add("Name");
        colNames.add("DoB");
        colNames.add("Phone No");
        tmd = new DefaultTableModel(colNames, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                //all cells false
                return false;
            }
        };
        // for .... tmd.addRow();
        for (Student student : DataManager.getInst().getStudentList()) {
            tmd.addRow(new Object[]{student.getId(), student.getName(), student.getDateOfBirth(), student.getPhoneNumber()});
        }


        tmd.fireTableDataChanged();
        dataTable = new JTable(tmd);

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
        final JPanel panel1 = new JPanel();
        panel1.setLayout(new com.intellij.uiDesigner.core.GridLayoutManager(1, 3, new Insets(0, 0, 0, 0), -1, -1));
        contentPane.add(panel1, new com.intellij.uiDesigner.core.GridConstraints(3, 0, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_BOTH, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, 1, null, null, null, 0, false));
        final JPanel panel2 = new JPanel();
        panel2.setLayout(new com.intellij.uiDesigner.core.GridLayoutManager(1, 3, new Insets(0, 0, 0, 0), -1, -1));
        panel1.add(panel2, new com.intellij.uiDesigner.core.GridConstraints(0, 0, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_BOTH, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, null, null, null, 0, false));
        addButton = new JButton();
        addButton.setText("Add");
        panel2.add(addButton, new com.intellij.uiDesigner.core.GridConstraints(0, 0, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_HORIZONTAL, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        editButton = new JButton();
        editButton.setText("Edit");
        panel2.add(editButton, new com.intellij.uiDesigner.core.GridConstraints(0, 1, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_HORIZONTAL, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        removeButton = new JButton();
        removeButton.setText("Remove");
        panel2.add(removeButton, new com.intellij.uiDesigner.core.GridConstraints(0, 2, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_HORIZONTAL, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        addToClassButton = new JButton();
        addToClassButton.setText("Add to class");
        panel1.add(addToClassButton, new com.intellij.uiDesigner.core.GridConstraints(0, 1, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_HORIZONTAL, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        updateResultButton = new JButton();
        updateResultButton.setText("Update Result");
        panel1.add(updateResultButton, new com.intellij.uiDesigner.core.GridConstraints(0, 2, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_HORIZONTAL, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        tablePanel = new JPanel();
        tablePanel.setLayout(new com.intellij.uiDesigner.core.GridLayoutManager(1, 1, new Insets(0, 0, 0, 0), -1, -1));
        contentPane.add(tablePanel, new com.intellij.uiDesigner.core.GridConstraints(2, 0, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_BOTH, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, null, null, null, 0, false));
        StudentListLabel = new JLabel();
        StudentListLabel.setText("Student List");
        contentPane.add(StudentListLabel, new com.intellij.uiDesigner.core.GridConstraints(0, 0, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_NONE, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        menuPanel = new JPanel();
        menuPanel.setLayout(new com.intellij.uiDesigner.core.GridLayoutManager(1, 1, new Insets(0, 0, 0, 0), -1, -1));
        contentPane.add(menuPanel, new com.intellij.uiDesigner.core.GridConstraints(1, 0, 1, 1, com.intellij.uiDesigner.core.GridConstraints.ANCHOR_CENTER, com.intellij.uiDesigner.core.GridConstraints.FILL_BOTH, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_SHRINK | com.intellij.uiDesigner.core.GridConstraints.SIZEPOLICY_CAN_GROW, null, null, null, 0, false));
    }

    /**
     * @noinspection ALL
     */
    public JComponent $$$getRootComponent$$$() {
        return contentPane;
    }
}
