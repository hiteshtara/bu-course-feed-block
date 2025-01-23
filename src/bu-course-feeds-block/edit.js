import { useState, useEffect } from '@wordpress/element';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Spinner, Notice } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { college, department, courseId } = attributes;
//Added a Real-Time Preview Section:Simulates data for the block editor interface.Block editor in the WordPress admin panel.
// Filters data for dropdowns and live previews.Works with attributes passed to setAttributes.
// It simulates the behavior of fetching and displaying course data as if it were coming from an API.Real-time updates and dropdown options.
//A <div> labeled block-preview now displays the selected college, department, and course dynamically.
//Displays None for unselected attributes in the preview.
//he preview updates immediately when users select a value from the dropdowns
//When you publish the block, the selected attributes (college, department, and courseId) are passed to the server and saved.
//Error and Loading States:Added feedback with a spinner and an error message directly within the block preview.
//When selecting college, department, and course, the block's left-hand preview updates immediately.

    // Mock data for coursesT he mock data (mockCourses) is a static array of objects representing courses.
    //When the user selects a college or department, the useEffect hook filters the mock data to match the selected values.
    //The filtered results are used to populate the course dropdown dynamically.
    //When the user selects a course, its course_id is saved to the block's attributes via setAttributes.
    //Initial State:The dropdowns are empty, showing placeholder options (e.g., "Select a College").No mock courses are displayed.
    //After Selecting a College:The useEffect hook filters mockCourses to match the selected college.he dropdown for department is populated.
    //After Selecting a Department:he useEffect hook further filters mockCourses to match both the selected college and department.
    //he course dropdown is populated with matching courses.After Selecting a Course:The selected course's course_id is stored in the block's attributes and displayed in the real-time preview.
    //The mock data in edit.js is essential for testing and simulating dynamic dropdowns and real-time previews in the block editor. 
    // It works hand-in-hand with setAttributes and the useEffect hook to create a smooth user experience while developing the block.

    const mockCourses = [
        // Engineering - Computer Science
        { course_id: 'CS101', title: 'Introduction to Programming', college: 'ENG', department: 'CS' },
        { course_id: 'CS102', title: 'Data Structures', college: 'ENG', department: 'CS' },
        { course_id: 'CS201', title: 'Algorithms', college: 'ENG', department: 'CS' },
        { course_id: 'CS301', title: 'Operating Systems', college: 'ENG', department: 'CS' },
    
        // Engineering - Electrical Engineering
        { course_id: 'EE101', title: 'Circuit Analysis I', college: 'ENG', department: 'EE' },
        { course_id: 'EE201', title: 'Digital Systems Design', college: 'ENG', department: 'EE' },
        { course_id: 'EE301', title: 'Signal Processing', college: 'ENG', department: 'EE' },
    
        // Science - Mathematics
        { course_id: 'MATH101', title: 'Calculus I', college: 'SCI', department: 'MATH' },
        { course_id: 'MATH102', title: 'Calculus II', college: 'SCI', department: 'MATH' },
        { course_id: 'MATH201', title: 'Linear Algebra', college: 'SCI', department: 'MATH' },
        { course_id: 'MATH301', title: 'Differential Equations', college: 'SCI', department: 'MATH' },
    
        // Science - Physics
        { course_id: 'PHYS101', title: 'General Physics I', college: 'SCI', department: 'PHYS' },
        { course_id: 'PHYS102', title: 'General Physics II', college: 'SCI', department: 'PHYS' },
        { course_id: 'PHYS201', title: 'Thermodynamics', college: 'SCI', department: 'PHYS' },
        { course_id: 'PHYS301', title: 'Quantum Mechanics', college: 'SCI', department: 'PHYS' },
    
        // Arts - Psychology
        { course_id: 'PSY101', title: 'Introduction to Psychology', college: 'ARTS', department: 'PSY' },
        { course_id: 'PSY201', title: 'Developmental Psychology', college: 'ARTS', department: 'PSY' },
        { course_id: 'PSY301', title: 'Cognitive Psychology', college: 'ARTS', department: 'PSY' },
    
        // Arts - History
        { course_id: 'HIST101', title: 'World History I', college: 'ARTS', department: 'HIST' },
        { course_id: 'HIST102', title: 'World History II', college: 'ARTS', department: 'HIST' },
        { course_id: 'HIST201', title: 'European History', college: 'ARTS', department: 'HIST' },
        { course_id: 'HIST301', title: 'Modern American History', college: 'ARTS', department: 'HIST' },
    
        // Arts - Fine Arts
        { course_id: 'FINE101', title: 'Drawing Basics', college: 'ARTS', department: 'FINE' },
        { course_id: 'FINE201', title: 'Painting Techniques', college: 'ARTS', department: 'FINE' },
        { course_id: 'FINE301', title: 'Sculpture', college: 'ARTS', department: 'FINE' },
    ];
    

    const [courseOptions, setCourseOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Filter courses based on college and department
    useEffect(() => {
        if (!college && !department) {
            setError('Please specify a college or department.');
            setCourseOptions([]);
            return;
        }

        setLoading(true);
        setError(null);

        setTimeout(() => {
            const filteredCourses = mockCourses.filter((course) => {
                const matchesCollege = college ? course.college === college : true;
                const matchesDepartment = department ? course.department === department : true;
                return matchesCollege && matchesDepartment;
            });

            if (filteredCourses.length > 0) {
                setCourseOptions([
                    { label: 'Select a Course', value: '' },
                    ...filteredCourses.map((course) => ({
                        label: `${course.title} (${course.course_id})`,
                        value: course.course_id,
                    })),
                ]);
                setError(null);
            } else {
                setCourseOptions([{ label: 'No courses found', value: '' }]);
                setError('No courses found for the specified filters.');
            }

            setLoading(false);
        }, 500);
    }, [college, department]);

    return (
        <div {...useBlockProps()}>
            {/* Sidebar settings */}
            <InspectorControls>
                <PanelBody title="Course Feed Settings">
                    <SelectControl
                        label="College"
                        value={college}
                        options={[
                            { label: 'Select a College', value: '' },
                            { label: 'Engineering (ENG)', value: 'ENG' },
                            { label: 'Science (SCI)', value: 'SCI' },
                        ]}
                        onChange={(value) => setAttributes({ college: value })}
                    />
                    <SelectControl
                        label="Department"
                        value={department}
                        options={[
                            { label: 'Select a Department', value: '' },
                            { label: 'Computer Science (CS)', value: 'CS' },
                            { label: 'Electrical Engineering (EE)', value: 'EE' },
                            { label: 'Mathematics (MATH)', value: 'MATH' },
                        ]}
                        onChange={(value) => setAttributes({ department: value })}
                        disabled={!college}
                    />
                    <SelectControl
                        label="Course"
                        value={courseId}
                        options={courseOptions}
                        onChange={(value) => setAttributes({ courseId: value })}
                        disabled={!department}
                    />
                </PanelBody>
            </InspectorControls>

            {/* Real-time preview */}
            <div className="block-preview">
                <h3>Course Feeds Preview</h3>
                <p><strong>Selected College:</strong> {college || 'None'}</p>
                <p><strong>Selected Department:</strong> {department || 'None'}</p>
                <p><strong>Selected Course:</strong> {courseId || 'None'}</p>

                {loading && <Spinner />}
                {error && <Notice status="error" isDismissible>{error}</Notice>}
            </div>
        </div>
    );
}
