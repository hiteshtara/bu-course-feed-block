import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';

registerBlockType('create-block/bu-course-feeds-block', {
    edit: Edit,
});
