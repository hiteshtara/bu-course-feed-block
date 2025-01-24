import { useState, useEffect } from '@wordpress/element';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Spinner, Notice } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { college, department, courseId } = attributes;

    const [courses, setCourses] = useState([]);
    const [courseOptions, setCourseOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch courses from the REST API
    useEffect(() => {
        async function fetchCourses() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('/wp-json/bu-course-feeds/v1/courses');
                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                const data = await response.json();
                setCourses(data);
            } catch (err) {
                setError(err.message);
                setCourses([]);
            } finally {
                setLoading(false);
            }
        }
        fetchCourses();
    }, []);

    // Filter courses based on selected college and department
    useEffect(() => {
        if (loading || error) return;

        const filteredCourses = courses.filter((course) => {
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
        } else {
            setCourseOptions([{ label: 'No courses found', value: '' }]);
        }
    }, [college, department, courses, loading, error]);

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
                            { label: 'Arts (ARTS)', value: 'ARTS' },
                        ]}
                        onChange={(value) => setAttributes({ college: value })}
                    />
                    <SelectControl
                        label="Department"
                        value={department}
                        options={[
                            { label: 'Select a Department', value: '' },
                            ...Array.from(
                                new Set(
                                    courses
                                        .filter((course) =>
                                            college ? course.college === college : true
                                        )
                                        .map((course) => course.department)
                                )
                            ).map((dept) => ({
                                label: dept,
                                value: dept,
                            })),
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
