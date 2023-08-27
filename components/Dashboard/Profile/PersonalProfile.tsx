import { LogOut, Users2, MapPin, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { SignOut } from "@/lib/auth/signOut";
import { Badge } from "@/components/ui/badge";
import { useTimestampConverter } from "@/lib/hooks/useTimestampConvert";
import { Session } from "@supabase/supabase-js";
import { useGetCurrentProfile } from "@/lib/supabase/getProfile";
import { Dispatch, SetStateAction, useState, ReactNode } from "react";
import SkeletonProfile from "./SkeletonProfile";
import EditProfile from "./Edit/EditProfile";
import { UserProfile } from "@/types/UserProfile";
import { BannerWithActions } from "./reusable/BannerWithActions";
import { ProfilePicture } from "./reusable/ProfilePicture";

type PersonalProfileProps = {
    router: AppRouterInstance;
    session: Session | null;
};

export interface ProfilePictureBannerProps {
    className?: string;
    dialogOpen: boolean;
    setDialogOpen: Dispatch<SetStateAction<boolean>>;
    displayUser: UserProfile | null;
    refetchUser: () => void;
    children?: ReactNode;
}

//USED XL BREAKPOINT ON PROFILE TO AVOID CROWDED SCREEN

export default function PersonalProfile({ router, session }: PersonalProfileProps) {
    const { loading, displayUser, refetchUser } = useGetCurrentProfile({ session });
    const formattedJoinDate = useTimestampConverter(displayUser?.created_at);
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            {!loading ? (
                <div className='rounded-xl shadow-sm'>
                    <BannerWithActions
                        dialogOpen={dialogOpen}
                        setDialogOpen={setDialogOpen}
                        displayUser={displayUser}
                        refetchUser={refetchUser}
                    >
                        <EditProfile
                            className='xl:hidden'
                            displayUser={displayUser}
                            refetchUser={refetchUser}
                        />
                        <Button
                            onClick={() => SignOut({ router })}
                            size={"icon"}
                            variant={"outline"}
                        >
                            <LogOut className='scale-75' />
                        </Button>
                    </BannerWithActions>
                    <ProfilePicture
                        dialogOpen={dialogOpen}
                        displayUser={displayUser}
                        refetchUser={refetchUser}
                        setDialogOpen={setDialogOpen}
                        className='-translate-y-[calc(4rem+50%)] xl:-translate-y-[calc(5rem+50%)]
                        xl:w-80 xl:h-80 xl:ml-10 xl:border-card shadow-lg'
                    />
                    <div
                        id='content'
                        className='
                        xl:mt-6 xl:grid xl:grid-cols-[20rem_auto] xl:gap-6 xl:pl-10'
                    >
                        <div id='profiledata' className='xl:w-80 xl:pt-20'>
                            <h1
                                id='display_name'
                                className='text-2xl xl:text-3xl tracking-tight font-semibold'
                            >
                                {displayUser?.display_name}
                            </h1>
                            <h3 id='username' className='text-muted-foreground'>
                                {"@" + displayUser?.username}
                                <Badge
                                    id='profile'
                                    className='w-auto bg-accent dark:bg-accent/60 text-foreground mt-2 ml-3'
                                >
                                    {displayUser?.profile == "Member"
                                        ? "Membro"
                                        : "Dono de .academia."}
                                </Badge>
                            </h3>

                            <p
                                id='bio'
                                className='text-sm text-foreground mt-4 xl:my-4 leading-5 max-h-[80px] overflow-clip whitespace-pre-line'
                            >
                                {displayUser?.bio}
                            </p>
                            <EditProfile
                                width='full'
                                className='w-full bg-card h-9 xl:block hidden'
                                displayUser={displayUser}
                                refetchUser={refetchUser}
                            />
                            <div className='text-muted-foreground flex gap-2 mb-4 xl:mt-4 '>
                                <Users2 />
                                <Badge className='bg-accent dark:bg-accent/60 text-muted-foreground h-7 rounded-sm text-sm gap-1'>
                                    <span className='text-foreground'>50</span> seguidores
                                </Badge>
                                <span>&bull;</span>
                                <Badge className='bg-accent dark:bg-accent/60 text-muted-foreground h-7 rounded-sm text-sm gap-1'>
                                    <span className='text-foreground'>24</span> seguindo
                                </Badge>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <span className=' text-muted-foreground text-sm flex gap-2 items-center '>
                                    <Dumbbell className='inline-block scale-75' />
                                    <span className='text-sm text-foreground'>Punch Fitness</span>
                                </span>
                                <span className=' text-muted-foreground text-sm flex gap-2 items-center '>
                                    <MapPin className='inline-block scale-75' />
                                    <span className='text-sm text-foreground'>
                                        Av Paulista, 735
                                    </span>
                                </span>
                                <span className='text-muted-foreground text-xs flex gap-2 items-center mt-2'>
                                    Entrou em {formattedJoinDate}.
                                </span>
                            </div>
                        </div>
                        <hr className='xl:hidden my-7 xl:my-0'></hr>
                        <div
                            id='posts'
                            className='w-full xl:bg-card h-[30rem] rounded-2xl xl:border-border xl:border-[1px] xl:shadow-lg'
                        ></div>
                    </div>
                </div>
            ) : (
                <SkeletonProfile />
            )}
        </>
    );
}
