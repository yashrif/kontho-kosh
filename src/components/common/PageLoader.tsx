import { Icons } from "@/components/common/Icons";

type PageLoaderProps = {
	message?: string;
}

/**
 * 🔄 Page loader component for loading states
 *
 * @param message - Optional loading message to display
 */
const PageLoader = ({ message = "Loading..." }: PageLoaderProps) => {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="text-center space-y-4">
				<div className="flex justify-center">
					<div className="animate-spin">
						<Icons.Shield className="h-8 w-8 text-primary" />
					</div>
				</div>
				<p className="text-sm text-muted-foreground">{message}</p>
			</div>
		</div>
	);
};

export { PageLoader };
export default PageLoader;
