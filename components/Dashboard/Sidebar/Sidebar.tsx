"use client";

import {
    Bell,
    Compass,
    Home,
    Layers,
    Menu,
    User,
    Activity,
    Dumbbell,
    Warehouse,
    Settings,
    BadgeHelp,
    Search,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import GymnIcon from "../../../public/g_SquareIcon.png";
import Image from "next/image";
import Link from "next/link";
import LinkButton from "./ui/LinkButton";
import { ModeToggle } from "@/components/ModeToggle";
import SearchCommand from "./ui/SearchCommand";
import { Session } from "@supabase/auth-helpers-nextjs";
import { useGetCurrentProfile } from "@/lib/supabase/getProfile";
import UserProfileCard from "./ui/UserProfileCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetRouteName } from "@/lib/hooks/useGetRouteName";
import { useTranslateAppRoutes } from "@/lib/hooks/useTranslateAppRoutes";
import BottomNav from "./ui/BottomNav";
import Breadcrumbs from "./ui/Breadcrumbs";

//TODO: Fix wrong color bug

export default function Sidebar({ session }: { session: Session | null }) {
    const [isClient, setIsClient] = useState(false);
    const [screenWidth, setScreenWidth] = useState<number>(0); // Inicializa com 0

    const { loading, displayUser } = useGetCurrentProfile({ session });

    function getCurrentDimension() {
        return window.innerWidth;
    }

    //HANDLER Sidebar Size
    useEffect(() => {
        setIsClient(true);
        setScreenWidth(getCurrentDimension()); // Define a largura inicial quando o componente é montado

        // Adiciona o event listener apenas no lado do cliente
        const updateDimension = () => {
            setScreenWidth(getCurrentDimension());
        };
        window.addEventListener("resize", updateDimension);

        return () => {
            window.removeEventListener("resize", updateDimension); // Remove o event listener ao desmontar o componente
        };
    }, []);

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    const pathname = usePathname();

    const searchParams = useSearchParams();
    const currentRoute = useGetRouteName(pathname);
    const translatedCurrentRoute = useTranslateAppRoutes(currentRoute);

    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname, searchParams]);

    if (!isClient) {
        return null;
    }

    return (
        <>
            <div
                id='sidebar'
                className={`fixed w-80 h-[100%] bg-card shadow-lg transition-all duration-300 border-border border-r-[1px] z-[30]
flex justify-between flex-col ${screenWidth >= 1024 ? "" : sidebarOpen ? "" : "-translate-x-80"}`}
            >
                <div id='topsection' className='w-full h-auto px-5 pt-5 flex flex-col gap-6'>
                    <div className='flex items-center w-full h-10 gap-4'>
                        <div className='w-10 h-10 bg-card rounded-lg'>
                            <Image
                                className='rounded-md'
                                width={40}
                                height={40}
                                src={GymnIcon}
                                alt=''
                            />
                        </div>
                        <div>
                            <h3 className='text-sm font-semibold'>Gymn</h3>
                            <h3 className='text-sm text-muted-foreground'>Plano Membro</h3>
                        </div>
                    </div>
                    <SearchCommand />
                    <div className='flex flex-col gap-1 -mt-2'>
                        <LinkButton
                            icon={<Compass />}
                            href='/explore'
                            text='Descobrir'
                            command='d'
                        />
                        <LinkButton icon={<Layers />} href='/inbox' text='Inbox' command='i' />

                        <LinkButton
                            icon={<Bell />}
                            href='/notifications'
                            text='Notificações'
                            command='n'
                        />

                        <LinkButton icon={<User />} href='/profile' text='Conta' command='c' />
                    </div>
                    <hr className='-mt-2'></hr>
                </div>

                <div
                    id='middlesection'
                    className=' w-full h-[100%] flex flex-col justify-between px-5 py-4'
                >
                    <div>
                        <p className='text-muted-foreground text-xs ml-5 mb-3'>Fitness</p>
                        <LinkButton icon={<Dumbbell />} href='/workouts' text='Treinos' />
                        <LinkButton icon={<Activity />} href='/exercises' text='Exercícios' />
                        <LinkButton icon={<Warehouse />} href='/gym' text='Sua academia' />
                    </div>
                    <div>
                        <LinkButton
                            icon={<Settings />}
                            href='/setting'
                            text='Configurações'
                            variant='muted'
                        />
                        <LinkButton
                            icon={<BadgeHelp />}
                            href='/about'
                            text={"Sobre"}
                            variant='muted'
                        />
                    </div>
                </div>

                <div id='bottomsection' className='w-full h-auto border-t-[1px] border-border'>
                    <UserProfileCard displayUser={displayUser} screenWidth={screenWidth} />
                </div>
            </div>
            <div
                id='breadcrumbs'
                style={{ zIndex: 30 }}
                className='lg:flex fixed bg-card bg- items-center pl-6 hidden lg:w-[calc(100%-20rem)] lg:ml-[20rem] h-14 border-b-[1px] border-border'
            >
                <Breadcrumbs pathname={pathname} />
            </div>
            {screenWidth < 1024 ? (
                <>
                    {/* Hamburger */}
                    <Button
                        className={`z-[40] fixed right-0 mx-3 mt-3 transition-all duration-300 `}
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <Menu className='absolute z-50' />
                    </Button>
                    <div
                        id={"header"}
                        className='w-full h-16 bg-background fixed flex items-center px-3 z-[20]'
                    >
                        <div className='w-full h-full flex items-center justify-center text-sm'>
                            <h4>{translatedCurrentRoute}</h4>
                        </div>
                    </div>

                    <div
                        id='blurry-bg'
                        className={`fixed w-full h-full bg-black z-[29] backdrop-blur-lg     transition-all ${
                            sidebarOpen
                                ? "opacity-20 dark:opacity-50 pointer-events-auto"
                                : "pointer-events-none opacity-0"
                        }`}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    ></div>

                    <BottomNav pathname={pathname} />
                </>
            ) : (
                <></>
            )}
        </>
    );
}
