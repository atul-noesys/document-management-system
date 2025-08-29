import axios, { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";
import { authConfig } from "./axios";

export type PaginationData = {
  DeletedColumns: string[];
  filterData: (string | number | null)[][];
  TotalRowCount: number;
  data: Record<string, string | number | Date | null>[];
  tableName: string;
};

export type PrimaryKeyData = {
  primaryKey: string;
  value: string;
};

export type RowData = Record<string, string | number | null>;

export class NguageStore {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  async GetPaginationData(tableData: {
    table: string;
    skip: number;
    take: number | null;
    NGaugeId: string | undefined;
    filters?:
      | { [key: string]: { items: string[]; operator: string }[] }
      | undefined;
    sort?: { [keyValue: string]: string } | undefined;
  }): Promise<PaginationData | null> {
    try {
      // Get token from localStorage (client-side only)
      let token = null;
      if (typeof window !== "undefined") {
        token = localStorage.getItem("access_token");
      }

      const { data }: AxiosResponse<PaginationData> = await axios.post(
        "/api/GetAllData",
        tableData,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        },
      );
      return data;
    } catch {
      return null;
    }
  }

  async UpdateRowData(
    editRowData: { rowData: RowData; primaryKeyData: PrimaryKeyData },
  ): Promise<{ result: boolean; error: string }> {
    try {
      // Get token from localStorage (client-side only)
      let token = null;
      if (typeof window !== "undefined") {
        token = localStorage.getItem("access_token");
      }

      await axios.put("/api/EditRow", editRowData, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      return { result: true, error: "" };
    } catch (e) {
      return { result: false, error: "error" };
    }
  }

  async UploadAttachFile(file: File, fileName: string) {
    try {
      // Get token from localStorage (client-side only)
      let token = null;
      if (typeof window !== "undefined") {
        token = localStorage.getItem("access_token");
      }

      const { data }: AxiosResponse = await axios.post("/api/UploadFile", {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      return data;
    } catch {
      return null;
    }
  }

  // async AddDataSourceRow(
  //   ngaugeFormId: number,
  //   table: string,
  //   rowData: RowData,
  // ): Promise<{ result: string | null; error: string }> {
  //   try {
  //     const { data }: AxiosResponse<string> = await axios.post(
  //       `${this.authStore.BaseV8Url}/NGaugeForms/${ngaugeFormId}/${table}/Row`,
  //       rowData,
  //       authConfig({  })
  //     );
  //     return { result: data, error: "" };
  //   } catch (e) {
  //     return { result: null, error: (e as {data : {ref : string}}).data.ref ?? "" };
  //   }
  // }
}
