import Head from "next/head";
import Link from "next/link";

import { useState} from "react";

import { api } from "~/utils/api";

import { Button, Drawer, Grid, Image, Select, Text, Spacer} from "@geist-ui/core";
import { useToasts } from "@geist-ui/core";
import ThemeChanger from "~/components/ui/ThemeChanger";
import { type ThemeChangerTypes } from "~/components/ui/ThemeChanger";
import Navbar from "~/components/ui/Navbar";

const Home = ({switchThemes, themeType}:ThemeChangerTypes) => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [drawerOpen, setDrawerOpen] = useState(false)   
  const [selectedValue, setSelectedValue] = useState<string | string[]>("")
 
  const { setToast } = useToasts()
  const showToast = () => setToast({ text: 'Hello, user!', delay: 2000 , type:"success"}) 
  const handler = (val: string | string[]) => setSelectedValue(val);  

  return (   
    <>
      <Head>
        <title>Gymn</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={themeType.type == "Dark" ? "dark" : ""}>
        <div></div>
        <Navbar switchThemes={switchThemes} themeType={themeType}/>
        <main className={`mt-[82px] flex min-h-screen flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-950 ` } color="">          
          <div className="flex flex-col items-center justify-center gap-12 z-10">
            <div id='colored_gradient' className="relative flex flex-col items-center justify-center gap-12 w-screen py-14 bg-gradient-to-r from-[#0575E6] to-[#00F260] bg-neutral-950">                            
              <div className="container flex flex-col items-center justify-center h-14 lg:h-24 z-20">
                <Image height="100%" src={themeType.type == "Dark" ? "/gymn_WhiteTextLogo.svg" : "/gymn_WhiteTextLogo.svg"} alt=''/>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 z-20">
                <Link
                  className="flex max-w-xs flex-col gap-4 rounded-xl bg-neutral-900 p-4 text-neutral-100 hover:bg-neutral-800 dark:hover:bg-white/20 dark:bg-white/10"
                  href="https://create.t3.gg/en/usage/first-steps"
                  target="_blank"
                >
                  <h3 className="text-2xl font-bold">First Steps →</h3>
                  <div className="text-lg">
                    Just the basics - Everything you need to know to set up your
                    database and authentication.
                  </div>
                </Link>
                <Link
                  className="flex max-w-xs flex-col gap-4 rounded-xl bg-neutral-900 p-4 text-neutral-100 hover:bg-neutral-800 dark:hover:bg-white/20 dark:bg-white/10"
                  href="https://create.t3.gg/en/introduction"
                  target="_blank"
                >
                  <h3 className="text-2xl font-bold">Documentation →</h3>
                  <div className="text-lg">
                    Learn more about Create T3 App, the libraries it uses, and how
                    to deploy it.
                  </div>
                </Link>
              </div>              
              <div id='black_gradient' className='absolute w-full h-full bg-gradient-to-b from-transparent to-neutral-100 z-0 dark:bg-gradient-to-b dark:from-transparent dark:to-neutral-950'></div>
            </div>           
            
            <p className="text-2xl text-neutral-950 dark:text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>            

            <Grid.Container justify="center" >            
              <Button auto type="success" onClick={showToast}>Toast</Button>
              <Button auto type="secondary-light" onClick={() => setDrawerOpen(true)}>Drawer</Button>
            </Grid.Container>  

            <Grid.Container justify="center">
              <Select placeholder="Select" onChange={handler}>
                <Select.Option value="Firebase">Firebase</Select.Option>
                <Select.Option value="Supabase">Supabase</Select.Option>
                <Select.Option value="MySql">MySql</Select.Option>
              </Select>
              <Spacer w={1}/>
              <ThemeChanger themeType={themeType} switchThemes={switchThemes} scale={4/5}/>
            </Grid.Container>   

            <Text blockquote my={0} className={selectedValue !== "" ? "block" : "hidden"}>
              Selected option: <b>{selectedValue}</b>
            </Text>    
            <Spacer h={100}/>
            <h4>There&apos;s nothing here.</h4>              
          </div>
        </main>
      </div>  
    </>
  );
};

export default Home;
