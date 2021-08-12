import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { IFeather } from '../../types/components';


export const Feather: React.FC<IFeather> = ({ text, icon,href }) => {
	return (
		<Link className='link' to={href}>
		<div className="feather">
			<div className='text-center'>
				<FontAwesomeIcon icon={icon} size="4x" className='mb-3' />
				<p>{text}</p>
			</div>
		</div>
		</Link>
	);
};
