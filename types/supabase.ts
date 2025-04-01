export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      attendanceXP: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      experiences: {
        Row: {
          attendance: number | null
          description: string | null
          endDate: string | null
          id: number
          location: string | null
          startDate: string
          title: string
        }
        Insert: {
          attendance?: number | null
          description?: string | null
          endDate?: string | null
          id?: number
          location?: string | null
          startDate: string
          title: string
        }
        Update: {
          attendance?: number | null
          description?: string | null
          endDate?: string | null
          id?: number
          location?: string | null
          startDate?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "experiences_attendance_fkey"
            columns: ["attendance"]
            isOneToOne: false
            referencedRelation: "attendanceXP"
            referencedColumns: ["id"]
          },
        ]
      }
      intro: {
        Row: {
          cvtxt: string
          cvurl: string | null
          description: string
          id: number
          locationdescription: string
          locationtitle: string
          opquastdescription: string
          opquasttitle: string
          opquasturl: string | null
          situationdescription: string
          situationtitle: string
          subtitle: string
          title: string
          xpdescription: string
          xptitle: string
        }
        Insert: {
          cvtxt: string
          cvurl?: string | null
          description: string
          id?: number
          locationdescription: string
          locationtitle: string
          opquastdescription: string
          opquasttitle: string
          opquasturl?: string | null
          situationdescription: string
          situationtitle: string
          subtitle: string
          title: string
          xpdescription: string
          xptitle: string
        }
        Update: {
          cvtxt?: string
          cvurl?: string | null
          description?: string
          id?: number
          locationdescription?: string
          locationtitle?: string
          opquastdescription?: string
          opquasttitle?: string
          opquasturl?: string | null
          situationdescription?: string
          situationtitle?: string
          subtitle?: string
          title?: string
          xpdescription?: string
          xptitle?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          icon: string | null
          id: number
          isHomeDisplayed: boolean
          isSkillsDisplayed: boolean
          name: string
          subtype: number | null
          type: number
        }
        Insert: {
          icon?: string | null
          id?: number
          isHomeDisplayed: boolean
          isSkillsDisplayed: boolean
          name: string
          subtype?: number | null
          type: number
        }
        Update: {
          icon?: string | null
          id?: number
          isHomeDisplayed?: boolean
          isSkillsDisplayed?: boolean
          name?: string
          subtype?: number | null
          type?: number
        }
        Relationships: [
          {
            foreignKeyName: "hardSkills_subtype_fkey"
            columns: ["subtype"]
            isOneToOne: false
            referencedRelation: "skillsSubtype"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hardSkills_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "skillsType"
            referencedColumns: ["id"]
          },
        ]
      }
      SkillsPerXP: {
        Row: {
          id: number
          idSkills: number
          idXP: number
        }
        Insert: {
          id?: number
          idSkills: number
          idXP: number
        }
        Update: {
          id?: number
          idSkills?: number
          idXP?: number
        }
        Relationships: [
          {
            foreignKeyName: "SkillsPerXP_idSkills_fkey"
            columns: ["idSkills"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "SkillsPerXP_idXP_fkey"
            columns: ["idXP"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      skillsSubtype: {
        Row: {
          id: number
          name: string
          type: number
        }
        Insert: {
          id?: number
          name: string
          type: number
        }
        Update: {
          id?: number
          name?: string
          type?: number
        }
        Relationships: [
          {
            foreignKeyName: "hardSkillsSubtype_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "skillsType"
            referencedColumns: ["id"]
          },
        ]
      }
      skillsType: {
        Row: {
          id: number
          isMissingSkills: boolean
          name: string
          textDescription: string | null
          titleTxt: string | null
        }
        Insert: {
          id?: number
          isMissingSkills: boolean
          name: string
          textDescription?: string | null
          titleTxt?: string | null
        }
        Update: {
          id?: number
          isMissingSkills?: boolean
          name?: string
          textDescription?: string | null
          titleTxt?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_experiences_data: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_intro_data: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_skills: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_skills_data: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
