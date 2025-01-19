"use client";
import { Key, useEffect, useState } from "react";
import Image from "next/image";
import { formatNumber, convertTimestampToLocal2 } from "@/utils/tools";
import fetcher from "@/utils/fetch/client/fetcher";
import { useSession } from "@/hooks/useSession";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import Loading from "@/components/Loading";

export default function Top() {
  const [pageLoading, setPageLoading] = useState(true);
  const session = useSession();
  const colors = [
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
  ];
  const [selectedColor, setSelectedColor] = useState<string>("secondary");

  useEffect(() => {
    setPageLoading(true);
    setTimeout(function () {
      setPageLoading(false);
    }, 2000);
  }, []);

  return pageLoading ? (
    <Loading />
  ) : (
    <main
      className={
        "max-w-lg min-h-screen mx-auto bg-bg bg-cover bg-top bg-no-repeat"
      }
    >
      <section className="flex flex-col justify-start items-center relative min-h-screen text-black bg-[#EFEFEF]/30">
        <div className="flex flex-col gap-3 p-8">
          <RadioGroup
            label="Selection color"
            orientation="horizontal"
            value={selectedColor}
            onValueChange={setSelectedColor}
          >
            {colors.map((color: any) => (
              <Radio
                key={color}
                color={color}
                value={color}
                className="capitalize"
              >
                {color}
              </Radio>
            ))}
          </RadioGroup>
          <Table
            bgcolor={selectedColor}
            selectionMode="multiple"
            defaultSelectedKeys={["2", "3"]}
            aria-label="Example static collection table"
          >
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>ROLE</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>Tony Reichert</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>Zoey Lang</TableCell>
                <TableCell>Technical Lead</TableCell>
                <TableCell>Paused</TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>Jane Fisher</TableCell>
                <TableCell>Senior Developer</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell>William Howard</TableCell>
                <TableCell>Community Manager</TableCell>
                <TableCell>Vacation</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
}
