import NavbarItem from "./NavbarItem";

export default function Navbar() {
  return (
    <nav className="flex dark:bg-gray-600 bg-amber-100 p-4 lg:text-lg justify-center gap-6">
      <NavbarItem param="/" title="Home" />
      <NavbarItem param="favorites" title="Favorites" />
      <NavbarItem param="about" title="About" />
    </nav>
  );
}
