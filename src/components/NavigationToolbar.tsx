interface NavigationToolbarProps {
  children: React.ReactNode;
  className: string;
}

function NavigationToolbar(props: NavigationToolbarProps) {
  const { children, className } = props;
  return <div className={"navigation-toolbar " + className}>{children}</div>;
}

export default NavigationToolbar;
