'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect,  useState } from 'react'
import Logo from '../../../public/cypresslogo.svg'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '../ui/navigation-menu'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { createClient } from '@/lib/utils/supabase/client'
import Loader from "@/components/ui/Loader"

const supabase = await createClient();



const routes = [
    {title : 'Features' , href : '#features'},
    {title : 'Resources' , href : '#resources'},
    {title : 'Pricing' , href : '#pricing'},
    {title : 'Testimonials' , href : '#testimonials'}
]

const components: {title: string , href: string , description : string}[] = [
    {
        title: 'Alert Dialog',
        href: '#',
        description:
          'A modal dialog that interrupts the user with important content and expects a response.',
      },
      {
        title: 'Hover Card',
        href: '#',
        description:
          'For sighted users to preview content available behind a link.',
      },
      {
        title: 'Progress',
        href: '#',
        description:
          'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
      },
      {
        title: 'Scroll-area',
        href: '#',
        description: 'Visually or semantically separates content.',
      },
      {
        title: 'Tabs',
        href: '#',
        description:
          'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
      },
      {
        title: 'Tooltip',
        href: '#',
        description:
          'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
      },
]

const Header = () => {


    const [path , setPath] = useState('#products')
    const [ isLoggedIn , setIsLoggedIn ] = useState<boolean | null>(null);

    useEffect(() => {
        async function checkLoginStatus(){
            const supabase = await createClient()
            const { data : session } = await supabase.auth.getSession()
            setIsLoggedIn(!!session?.session)
        }

        checkLoginStatus()
    },[])

    if (isLoggedIn === null) {
        // Optionally, show a loading spinner while checking session
        return (
            <header className='p-4 flex justify-center items-center'>
                <Link href={'/'} className='w-full flex gap-2 justify-start items-center'>
                    <Image src={Logo} alt='Cypress Logo' width={25} height={25} />
                    <span className='font-semibold dark:text-white'>
                        cypress.
                    </span>
                </Link>
                <NavigationMenu className='hidden md:block'>
            <NavigationMenuList className='gap-6'>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        onClick={() => setPath('#resources')}
                        className={cn({
                            'dark:text-white' : path === '#resources',
                            'dark:text-white/40' : path !== '#resources',
                            'font-normal' : true,
                            'text-xl' : true
                        })} 
                    >
                        Resources
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className='grid gap-3 p-6 md:w-[400px] lg:w-p[500px] lg:grid-cols-[0.75fr_1fr]'>
                            <li className='row-span-3'>
                                <span 
                                    className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-empty'
                                >
                                    Welcome
                                </span>
                            </li>
                            <ListItem href="#" title='Introduction'>
                                Re-usable components built using Radix UI and Tailwind CSS.
                            </ListItem>
                            <ListItem href="#" title='Installation'>
                                How to Install dependencies and structure of your app.
                            </ListItem>
                            <ListItem href="#" title='Typography'>
                                Styles for headings, paragraphs, lists...etc
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        onClick={ () => setPath('#pricing') }
                        className={cn({
                            'dark:text-white' : path === '#pricing',
                            'dark:text-white/40': path !== '#pricing',
                            'font-normal' : true,
                            'text-xl' : true
                        })}
                    >
                        Pricing
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className='grid w-[400px] gap-3 p-4 md:grid-flow-2'>
                            <ListItem href="#" title='Pro Plan'>
                                Unlock full power with collaboration
                            </ListItem>
                            <ListItem href="#" title='Free Plan'>
                                Great for teams just starting out
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>                    
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuContent>
                        <NavigationMenuContent>
                            <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                                {components.map((component) => (
                                    <ListItem key={component.title} title={component.title} href={component.href}>
                                        {component.description}
                                    </ListItem> 
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(),{
                        'dark:text-white' : path === '#testimonials',
                        'dark:text-white/40' : path !== '#tesimonials',
                        'font-normal' : true,
                        'text-xl' : true
                    })} asChild>
                            Testimonials
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>            
        </NavigationMenu>
                <aside className=' flex w-full gap-2 justify-end'>
                    <Loader /> {/* Show a loading spinner */}
                </aside>
            </header>
        );
    }

  return (
    <header className='p-4 flex justify-center items-center'>
        <Link href={'/'} className='w-full flex gap-2 justify-start items-center'>
            <Image src={Logo} alt='Cypress Logo' width={25} height={25} />
            <span className='font-semibold dark:text-white'>
                cypress.
            </span>
        </Link>
        <NavigationMenu className='hidden md:block'>
            <NavigationMenuList className='gap-6'>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        onClick={() => setPath('#resources')}
                        className={cn({
                            'dark:text-white' : path === '#resources',
                            'dark:text-white/40' : path !== '#resources',
                            'font-normal' : true,
                            'text-xl' : true
                        })} 
                    >
                        Resources
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className='grid gap-3 p-6 md:w-[400px] lg:w-p[500px] lg:grid-cols-[0.75fr_1fr]'>
                            <li className='row-span-3'>
                                <span 
                                    className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-empty'
                                >
                                    Welcome
                                </span>
                            </li>
                            <ListItem href="#" title='Introduction'>
                                Re-usable components built using Radix UI and Tailwind CSS.
                            </ListItem>
                            <ListItem href="#" title='Installation'>
                                How to Install dependencies and structure of your app.
                            </ListItem>
                            <ListItem href="#" title='Typography'>
                                Styles for headings, paragraphs, lists...etc
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        onClick={ () => setPath('#pricing') }
                        className={cn({
                            'dark:text-white' : path === '#pricing',
                            'dark:text-white/40': path !== '#pricing',
                            'font-normal' : true,
                            'text-xl' : true
                        })}
                    >
                        Pricing
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className='grid w-[400px] gap-3 p-4 md:grid-flow-2'>
                            <ListItem href="#" title='Pro Plan'>
                                Unlock full power with collaboration
                            </ListItem>
                            <ListItem href="#" title='Free Plan'>
                                Great for teams just starting out
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>                    
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuContent>
                        <NavigationMenuContent>
                            <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                                {components.map((component) => (
                                    <ListItem key={component.title} title={component.title} href={component.href}>
                                        {component.description}
                                    </ListItem> 
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(),{
                        'dark:text-white' : path === '#testimonials',
                        'dark:text-white/40' : path !== '#tesimonials',
                        'font-normal' : true,
                        'text-xl' : true
                    })} asChild>
                            Testimonials
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>            
        </NavigationMenu>
        <aside className=' flex w-full gap-2 justify-end'>
            {isLoggedIn ? (
            <Link href={'/dashboard'}>
                <Button variant={'ghost'} className='p-4'>
                    Dashboard
                </Button>
            </Link> )
            :(
                <>
                    <Link href={'/login'}>
                        <Button variant={'btn-secondary'} className='p-1 hidden md:block'>
                            Login
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button variant={'btn-primary'} className='whitespace-nowrap'>
                            Signup
                        </Button>            
                    </Link>
                </>
            )}
        </aside>
    </header>
  )
}

export default Header

const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'>
>(( {className, title, children, ...props}, ref ) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a 
                    ref={ref} 
                    className={cn('group block select-none space-y-1 font-medium leading-none')} 
                    {...props}
                >
                    <div className='text-white text-sm font-medium leading-none'>
                       {title}
                    </div>   
                    <p className='group-hover:text-white/70 line-clamp-2 leading-snug text-white/40'>
                        {children}
                    </p>                            
                </a>
            </NavigationMenuLink>
        </li>
    )
})

ListItem.displayName = 'ListItem'