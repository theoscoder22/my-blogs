import { Container } from './container';
import { SocialLinks } from './social-links';

export const Footer = () => {
	return (
		<footer className="border-t py-10 dark:border-neutral-800">
			<Container className="px-5 text-center">
				<SocialLinks />
				<p className="mt-6 text-lg text-white dark:text-neutral-300">
					Made with ❤️ by Ayush
				</p>
			</Container>
		</footer>
	);
};
