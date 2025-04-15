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
          course: boolean | null
          description: string | null
          endDate: string | null
          gitBranch: boolean | null
          id: number
          location: string | null
          startDate: string
          title: string
        }
        Insert: {
          attendance?: number | null
          course?: boolean | null
          description?: string | null
          endDate?: string | null
          gitBranch?: boolean | null
          id?: number
          location?: string | null
          startDate: string
          title: string
        }
        Update: {
          attendance?: number | null
          course?: boolean | null
          description?: string | null
          endDate?: string | null
          gitBranch?: boolean | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
