import '../index.css';
import '../App.css';
import '../styles/Home.css';
import '../styles/Shop.css';
import '../styles/Product.css';
import '../styles/Categories.css';
import '../styles/Checkout.css';
import '../styles/SearchResults.css';
import '../styles/ContentPage.css';
import '../styles/Account.css';
import Providers from '../components/Providers';
import Layout from '../layouts/Layout';
import AssistiveTouch from '../components/AssistiveTouch';
import PrefetchLoader from '../components/PrefetchLoader';

export const metadata = {
    metadataBase: new URL('https://kimi.com.pk'),
    title: {
        default: 'Kimi — Wear Without Fear',
        template: '%s - Kimi'
    },
    description: 'Your premium fashion destination for the latest trends in Pakistan.',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://kimi.com.pk',
        siteName: 'Kimi Fashion Store',
        images: [
            {
                url: '/og-image.jpg', // Ensure this file exists or update path
                width: 1200,
                height: 630,
                alt: 'Kimi Fashion Store',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@kimistore',
        creator: '@kimistore',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning={true}>
                <PrefetchLoader />
                <Providers>
                    <Layout>
                        {children}
                        <AssistiveTouch />
                    </Layout>
                </Providers>
            </body>
        </html>
    );
}
