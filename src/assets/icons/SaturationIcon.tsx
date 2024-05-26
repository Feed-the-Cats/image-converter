import { FC } from 'react';

interface Props {
	className?: string;
}

export const SaturationIcon: FC<Props> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" xmlSpace="preserve">
			<path d="M14.2 16c.5-.5.8-1.2.8-2 0-.3 0-.6-.1-.9-.3.1-.5.1-.8.1-1.3 0-2.2-.7-2.9-1.3-.2-.2-.8-.6-.9-.6 0 0-.1 0-.3.1-.5 1-.8 1.8-.8 2.5s.3 1.4.8 2c1 1.3 3 1.3 4.2.1z" />
			<path d="M12 19.7c-1.5 0-3-.6-4.1-1.7-1.1-1.1-1.6-2.5-1.6-4 .1-2.7 1.8-5 3.6-7.4.5-.6 1-1.3 1.4-2l.7-.8.6.9c.5.7 1 1.4 1.5 2 1.8 2.4 3.5 4.6 3.6 7.3 0 1.5-.5 2.9-1.6 4-1.1 1-2.6 1.7-4.1 1.7zm0-13.3-.9 1.2C9.5 9.7 7.9 11.8 7.8 14c0 1.1.4 2.1 1.1 2.9.8.8 1.9 1.3 3 1.3s2.3-.5 3-1.3c.8-.8 1.2-1.8 1.1-2.9-.1-2.1-1.5-4.1-3.3-6.4-.1-.4-.4-.8-.7-1.2z" />
		</svg>
	);
};