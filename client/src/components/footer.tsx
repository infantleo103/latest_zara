import { Link } from 'wouter';

export default function Footer() {
  const footerSections = [
    {
      title: 'HELP',
      links: [
        { name: 'Size Guide', href: '#' },
        { name: 'Contact Us', href: '#' },
        { name: 'Exchange & Returns', href: '#' },
        { name: 'Shipping', href: '#' },
        { name: 'Payment', href: '#' },
      ],
    },
    {
      title: 'FOLLOW US',
      links: [
        { name: 'Instagram', href: 'https://www.instagram.com/zara/' },
        { name: 'Facebook', href: 'https://www.facebook.com/Zara' },
        { name: 'X', href: 'https://x.com/ZARA' },
        { name: 'Pinterest', href: 'https://es.pinterest.com/zaraofficial' },
        { name: 'YouTube', href: 'http://www.youtube.com/user/zara' },
        { name: 'Spotify', href: 'https://open.spotify.com/user/r6ivwuv0ebk346hhxo446pbfv' },
      ],
    },
    {
      title: 'COMPANY',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Sustainability', href: '#' },
        { name: 'Investors', href: '#' },
      ],
    },
    {
      title: 'POLICIES',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Use', href: '#' },
        { name: 'Cookies', href: '#' },
        { name: 'Legal Notice', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-medium mb-4 text-sm tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-black transition-colors"
                        data-testid={`link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="hover:text-black transition-colors"
                        data-testid={`link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Link */}
        <div className="border-t border-gray-100 mt-12 pt-8">
          <div className="text-center">
            <a
              href="https://www.zara.com/in/en/z-newsletter-nl1400.html?v1=11110"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-sm text-gray-600 hover:text-black transition-colors"
              data-testid="link-newsletter"
            >
              <span>JOIN OUR NEWSLETTER</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-100 mt-8 pt-8 text-center text-xs text-gray-500">
          <div className="mb-4">
            <p>Name and address of the manufacturer:</p>
            <p className="font-medium">Industria de Diseño Textil, S.A. (INDITEX, S.A.)</p>
            <p>Avenida de la Diputación, Edificio Inditex, 15143, Arteixo (A Coruña), Spain</p>
          </div>
          <p>&copy; 2024 ZARA India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
