/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bu-course-feeds-block/edit.js":
/*!*******************************************!*\
  !*** ./src/bu-course-feeds-block/edit.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




function Edit({
  attributes,
  setAttributes
}) {
  const {
    college,
    department,
    courseId
  } = attributes;
  const mockCourses = [
  // Engineering - Computer Science
  {
    course_id: 'CS101',
    title: 'Introduction to Programming',
    college: 'ENG',
    department: 'CS'
  }, {
    course_id: 'CS102',
    title: 'Data Structures',
    college: 'ENG',
    department: 'CS'
  }, {
    course_id: 'CS201',
    title: 'Algorithms',
    college: 'ENG',
    department: 'CS'
  }, {
    course_id: 'CS301',
    title: 'Operating Systems',
    college: 'ENG',
    department: 'CS'
  },
  // Engineering - Electrical Engineering
  {
    course_id: 'EE101',
    title: 'Circuit Analysis I',
    college: 'ENG',
    department: 'EE'
  }, {
    course_id: 'EE201',
    title: 'Digital Systems Design',
    college: 'ENG',
    department: 'EE'
  }, {
    course_id: 'EE301',
    title: 'Signal Processing',
    college: 'ENG',
    department: 'EE'
  },
  // Science - Mathematics
  {
    course_id: 'MATH101',
    title: 'Calculus I',
    college: 'SCI',
    department: 'MATH'
  }, {
    course_id: 'MATH102',
    title: 'Calculus II',
    college: 'SCI',
    department: 'MATH'
  }, {
    course_id: 'MATH201',
    title: 'Linear Algebra',
    college: 'SCI',
    department: 'MATH'
  }, {
    course_id: 'MATH301',
    title: 'Differential Equations',
    college: 'SCI',
    department: 'MATH'
  },
  // Science - Physics
  {
    course_id: 'PHYS101',
    title: 'General Physics I',
    college: 'SCI',
    department: 'PHYS'
  }, {
    course_id: 'PHYS102',
    title: 'General Physics II',
    college: 'SCI',
    department: 'PHYS'
  }, {
    course_id: 'PHYS201',
    title: 'Thermodynamics',
    college: 'SCI',
    department: 'PHYS'
  }, {
    course_id: 'PHYS301',
    title: 'Quantum Mechanics',
    college: 'SCI',
    department: 'PHYS'
  },
  // Arts - Psychology
  {
    course_id: 'PSY101',
    title: 'Introduction to Psychology',
    college: 'ARTS',
    department: 'PSY'
  }, {
    course_id: 'PSY201',
    title: 'Developmental Psychology',
    college: 'ARTS',
    department: 'PSY'
  }, {
    course_id: 'PSY301',
    title: 'Cognitive Psychology',
    college: 'ARTS',
    department: 'PSY'
  },
  // Arts - History
  {
    course_id: 'HIST101',
    title: 'World History I',
    college: 'ARTS',
    department: 'HIST'
  }, {
    course_id: 'HIST102',
    title: 'World History II',
    college: 'ARTS',
    department: 'HIST'
  }, {
    course_id: 'HIST201',
    title: 'European History',
    college: 'ARTS',
    department: 'HIST'
  }, {
    course_id: 'HIST301',
    title: 'Modern American History',
    college: 'ARTS',
    department: 'HIST'
  },
  // Arts - Fine Arts
  {
    course_id: 'FINE101',
    title: 'Drawing Basics',
    college: 'ARTS',
    department: 'FINE'
  }, {
    course_id: 'FINE201',
    title: 'Painting Techniques',
    college: 'ARTS',
    department: 'FINE'
  }, {
    course_id: 'FINE301',
    title: 'Sculpture',
    college: 'ARTS',
    department: 'FINE'
  }];
  const [courseOptions, setCourseOptions] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!college && !department) {
      setError('Please specify a college or department.');
      setCourseOptions([]);
      return;
    }
    setLoading(true);
    setError(null);
    setTimeout(() => {
      const filteredCourses = mockCourses.filter(course => {
        const matchesCollege = college ? course.college === college : true;
        const matchesDepartment = department ? course.department === department : true;
        return matchesCollege && matchesDepartment;
      });
      if (filteredCourses.length > 0) {
        setCourseOptions([{
          label: 'Select a Course',
          value: ''
        }, ...filteredCourses.map(course => ({
          label: `${course.title} (${course.course_id})`,
          value: course.course_id
        }))]);
        setError(null);
      } else {
        setCourseOptions([{
          label: 'No courses found',
          value: ''
        }]);
        setError('No courses found for the specified filters.');
      }
      setLoading(false);
    }, 500);
  }, [college, department]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)(),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: "Course Feed Settings",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: "College",
          value: college,
          options: [{
            label: 'Select a College',
            value: ''
          }, {
            label: 'Engineering (ENG)',
            value: 'ENG'
          }, {
            label: 'Science (SCI)',
            value: 'SCI'
          }],
          onChange: value => setAttributes({
            college: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: "Department",
          value: department,
          options: [{
            label: 'Select a Department',
            value: ''
          }, {
            label: 'Computer Science (CS)',
            value: 'CS'
          }, {
            label: 'Electrical Engineering (EE)',
            value: 'EE'
          }, {
            label: 'Mathematics (MATH)',
            value: 'MATH'
          }],
          onChange: value => setAttributes({
            department: value
          }),
          disabled: !college
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: "Course",
          value: courseId,
          options: courseOptions,
          onChange: value => {
            console.log('Selected Course ID:', value);
            setAttributes({
              courseId: value
            });
          },
          disabled: !department
        })]
      })
    })
  });
}

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!********************************************!*\
  !*** ./src/bu-course-feeds-block/index.js ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/bu-course-feeds-block/edit.js");


(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('create-block/bu-course-feeds-block', {
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map