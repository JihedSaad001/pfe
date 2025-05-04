import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted/40 pt-12">
      <div className="container grid gap-12 pb-12 md:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Image src="/placeholder.svg?height=40&width=40" alt="Logo" width={40} height={40} />
            <span>Luxury Hotel</span>
          </Link>
          <p className="mt-4 text-muted-foreground">
            Experience luxury hospitality at its finest. Our award-winning hotel offers elegant accommodations,
            exquisite dining, and unforgettable events.
          </p>
          <div className="mt-6 flex gap-4">
            <Link href="https://facebook.com" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="https://youtube.com" className="text-muted-foreground hover:text-primary">
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium">Quick Links</h3>
          <nav className="grid gap-3">
            <Link href="/rooms" className="text-muted-foreground hover:text-primary">
              Rooms & Suites
            </Link>
            <Link href="/dining" className="text-muted-foreground hover:text-primary">
              Dining
            </Link>
            <Link href="/events" className="text-muted-foreground hover:text-primary">
              Events
            </Link>
            <Link href="/spa" className="text-muted-foreground hover:text-primary">
              Spa & Wellness
            </Link>
            <Link href="/gallery" className="text-muted-foreground hover:text-primary">
              Gallery
            </Link>
            <Link href="/offers" className="text-muted-foreground hover:text-primary">
              Special Offers
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium">About</h3>
          <nav className="grid gap-3">
            <Link href="/about" className="text-muted-foreground hover:text-primary">
              About Us
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary">
              Contact
            </Link>
            <Link href="/careers" className="text-muted-foreground hover:text-primary">
              Careers
            </Link>
            <Link href="/press" className="text-muted-foreground hover:text-primary">
              Press
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium">Contact Us</h3>
          <address className="grid gap-4 not-italic text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 shrink-0 text-primary" />
              <p>123 Luxury Avenue, Oceanview, CA 90210, USA</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 shrink-0 text-primary" />
              <a href="tel:+1-800-123-4567" className="hover:text-primary">
                +1 (800) 123-4567
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 shrink-0 text-primary" />
              <a href="mailto:info@luxuryhotel.com" className="hover:text-primary">
                info@luxuryhotel.com
              </a>
            </div>
          </address>
        </div>
      </div>

      <div className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Luxury Hotel & Resort. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-primary">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-primary">
              Privacy
            </Link>
            <Link href="/cookies" className="hover:text-primary">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
