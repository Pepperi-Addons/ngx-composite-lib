import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
//import { CommonModule } from '@angular/common';
import { PepGenericFormModule } from './generic-form.module';
import { GenericFormComponent } from './generic-form.component';
import { PepNgxHelperModule } from '../src/core/common/modules/ngx-helper-module';

//import { SBNgxHelperModule } from '@storybook-settings/typings/';

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    decorators: [
        // The necessary modules for the component to work on Storybook
        moduleMetadata({
            imports: [
                
                PepGenericFormModule,
                PepNgxHelperModule
            ],
           // declarations: [GenericFormComponent]
        })
    ],
    title: 'Components/GenericForm',
    component: GenericFormComponent,
    argTypes: {
        dataView: {
            description: 'this is the form data view',
            defaultValue: {
                Type: 'Form',
                Hidden: false,
                Columns: [],
                Context: {
                    Object: {
                        Resource: 'transactions',
                        InternalID: 0,
                        Name: 'Object Name'
                    },
                    Name: 'Context Name',
                    ScreenSize: 'Tablet',
                    Profile: {
                        InternalID: 0,
                        Name: 'Profile Name'
                    }
                },
                Fields: [
                    {
                        FieldID: 'GeneralInformation',
                        Type: 'Separator',
                        Title: 'General Information',
                        Mandatory: false,
                        ReadOnly: false,
                        Layout: {
                            Origin: {
                                X: 0,
                                Y: 0
                            },
                            Size: {
                                Width: 2,
                                Height: 0
                            }
                        },
                        Style: {
                            Alignment: {
                                Horizontal: 'Stretch',
                                Vertical: 'Stretch'
                            }
                        }
                    },
                    {
                        FieldID: 'ItemExternalID',
                        Type: 'TextBox',
                        Title: 'Item Code',
                        Mandatory: true,
                        ReadOnly: false,
                        Layout: {
                            Origin: {
                                X: 0,
                                Y: 1
                            },
                            Size: {
                                Width: 1,
                                Height: 0
                            }
                        },
                        Style: {
                            Alignment: {
                                Horizontal: 'Stretch',
                                Vertical: 'Stretch'
                            }
                        }
                    },
                    {
                        FieldID: 'ActionDateTime',
                        Type: 'DateAndTime',
                        Title: 'Action Date Time',
                        Mandatory: false,
                        ReadOnly: false,
                        Layout: {
                            Origin: {
                                X: 1,
                                Y: 1
                            },
                            Size: {
                                Width: 1,
                                Height: 0
                            }
                        },
                        Style: {
                            Alignment: {
                                Horizontal: 'Stretch',
                                Vertical: 'Stretch'
                            }
                        }
                    },
                    {
                        FieldID: 'WrntyID',
                        Type: 'LimitedLengthTextBox',
                        Title: 'ID',
                        Mandatory: false,
                        ReadOnly: true,
                        Layout: {
                            Origin: {
                                X: 0,
                                Y: 2
                            },
                            Size: {
                                Width: 1,
                                Height: 0
                            }
                        },
                        Style: {
                            Alignment: {
                                Horizontal: 'Stretch',
                                Vertical: 'Stretch'
                            }
                        }
                    },
                    {
                        FieldID: 'TSATsaTextTest',
                        Type: 'TextBox',
                        Title: 'TSA Tsa Text Test',
                        Mandatory: false,
                        ReadOnly: false,
                        Layout: {
                            Origin: {
                                X: 1,
                                Y: 2
                            },
                            Size: {
                                Width: 1,
                                Height: 0
                            }
                        },
                        Style: {
                            Alignment: {
                                Horizontal: 'Stretch',
                                Vertical: 'Stretch'
                            }
                        }
                    }
                ],
                Rows: []
            },
            control: {
                type: 'object'
            },
            table: {
                type: {
                    summary: 'IPepGenericFormDataView'
                }
            }
        },
        dataSource: {
            description: 'this is the form data object',
            defaultValue: {},
            table: {
                type: {
                    summary: 'any'
                }
            }
        },
        isLocked: {
            description: 'is the form locked for edit?',
            defaultValue: false,
            control: 'boolean',
        },
        inline: {
            description: 'is the component inline?',
            defaultValue: false,
            control: 'boolean',
        },
        showTopBar: {
            description: 'is the top bar visible?',
            defaultValue: false,
            control: 'boolean',
        },
        addPadding: {
            description: 'add padding to container?',
            defaultValue: false,
            control: 'boolean',
        },
        valueChange: {
            action: 'valueChange',
            control: false
        },
        fieldClick: {
            action: 'fieldClick',
            control: false
        }/*,
        formValidationChange: {
            action: 'formValidationChange',
            control: false
        } */
    },
    parameters: {
        controls: {
            include: [
                'dataView',
                'dataSource',
                'isLocked',
                'inline',
                'showTopBar',
                'addPadding',
                'valueChange',
                'fieldClick',
               // 'formValidationChange'
            ],
        },
    }

} as Meta;

/*
const Template: Story<GenericFormComponent> = (args: GenericFormComponent) => ({
    props: args,
   template: `
        <pep-generic-form [dataView]="dataView" [dataSource]="dataSource" [isLocked]="isLocked" [inline]="inline" [showTopBar]="showTopBar" [addPadding]="addPadding"
        (valueChange)="valueChange($event)" (fieldClick)="fieldClick($event)" (formValidationChange)="formValidationChange($event)"></pep-generic-form>
    `
}); */

const Template: Story = (args) => ({
    props: args,
    template: `
        <pep-generic-form [dataView]="dataView" [dataSource]="dataSource" [isLocked]="isLocked" [inline]="inline" [showTopBar]="showTopBar" [addPadding]="addPadding"
        (valueChange)="valueChange($event)" (fieldClick)="fieldClick($event)"></pep-generic-form>
    `
});

export const Base = Template.bind({});
Base.args = {}

