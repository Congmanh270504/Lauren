import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50">
              <Image
                src="/1.jpg"
                width={500}
                height={500}
                alt="Picture of the author"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="aspect-video rounded-xl bg-muted/50">
              {" "}
              <Image
                src="/2.jpg"
                width={500}
                height={500}
                alt="Picture of the author"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="aspect-video rounded-xl bg-muted/50">
              {" "}
              <Image
                src="/3.jpg"
                width={500}
                height={500}
                alt="Picture of the author"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
          <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50 md:min-h-min relative">
            {" "}
            <Image
              src="/4.jpg"
              fill
              alt="Picture of the author"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
