/**
 * Standardized prop interfaces for components
 */

// Base properties shared across multiple components
export interface BaseProps {
  class?: string;
  id?: string;
}

// Standard container props
export interface ContainerProps extends BaseProps {
  borderColor?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  frosted?: boolean;
  panel?: boolean;
}

// Component that can be either a button or an anchor
export type ActionElementProps =
  | { href: string; type?: never }
  | { href?: never; type: 'button' | 'submit' | 'reset' };

// Button props
export type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'highlight';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  class?: string;
  disabled?: boolean;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
};

// Navigation link props
export interface NavLinkProps extends BaseProps {
  href: string;
  active?: boolean;
  external?: boolean;
}

// Section header props
export interface SectionHeaderProps extends BaseProps {
  title: string;
  description?: string;
  actionButton?: {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'highlight';
  };
  accent?: 'top' | 'bottom' | 'left' | 'right';
  accentSize?: 'sm' | 'md' | 'lg';
}

// Card component props
export interface CardProps extends BaseProps {
  title?: string;
  description?: string;
  link?: string;
  linkText?: string;
  featured?: boolean;
  image?: {
    src: string;
    alt: string;
  };
}

// Tag component props
export interface TagProps extends BaseProps {
  label: string;
  color?: 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'indigo';
}

// Table of Contents props
export interface TOCProps extends BaseProps {
  headings: Array<{
    depth: number;
    slug: string;
    text: string;
  }>;
}

// Social Icon props
export interface SocialIconProps extends BaseProps {
  label: string;
  href: string;
  'aria-label'?: string;
  title?: string;
}

// Reading time component props
export interface ReadingTimeProps extends BaseProps {
  content: string;
  wordsPerMinute?: number;
}

// Share buttons props
export interface ShareButtonsProps extends BaseProps {
  title: string;
  url: string;
}

// Code block props
export interface CodeBlockProps extends BaseProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}

// Color swatch props
export interface ColorSwatchProps extends BaseProps {
  color: string;
  name: string;
  hex: string;
}

// Footer link props
export interface FooterLinkProps extends BaseProps {
  href: string;
  external?: boolean;
}

// SEO metadata props
export interface SEOProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
}
